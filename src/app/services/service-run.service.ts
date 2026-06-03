
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ServicesService } from './services.service';
import { DateTimeService } from './date-time.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// Exported interfaces used by other components
export class Filter {
  name = '';
  constructor(name?: string) {
    if (name) this.name = name;
  }
}

export class FilterGroup {
  name = '';
  filters: Filter[] = [];
  constructor(name?: string, filters?: Filter[]) {
    if (name) this.name = name;
    if (filters) this.filters = filters;
  }
}

export enum ServiceRunStatus {
  Completed = 'Completed',
  Processing = 'Processing',
  Error = 'Error',
  'Processed with Errors' = 'Processed with Errors',
  Queued = 'Queued',
  Cancelled = 'Cancelled',
  Missing = 'Missing',
  Scheduled = 'Scheduled',
}

export class ServiceRun {
  id = '';
  serviceId = '';
  serviceName = '';
  taskName = '';
  status: ServiceRunStatus[] = [];
  statusIndex = 0;
  submittedDate: Date = new Date();
  durationHours = 0;
  owner = '';
  userName = '';
  userId = '';
  comment = '';
  inputParameters: any[] = [];
  results: any[] = [];
  lastUpdated: Date = new Date();
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRunService {
  serviceRuns: ServiceRun[] = [];
  serviceRuns$ = new BehaviorSubject<ServiceRun[]>([]);
  serviceRunsUpdated$ = new Subject<void>();
  filtersActive = false;
  currentServiceRunsId = '';
  currentServiceName = '';
  lastExecutedServiceName = '';

  private baseUrl = '/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private servicesService: ServicesService,
    private dateTimeService: DateTimeService
  ) {}

  private getHeaders(): HttpHeaders {
    const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    const token = idTokenKey ? localStorage.getItem(idTokenKey) || '' : '';

    if (!token) {
      return new HttpHeaders({ Authorization: '', Partition: '' });
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return new HttpHeaders({ Authorization: `Bearer ${token}`, Partition: '' });
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const partition = (payload['custom:Org'] || '').replace(/#$/, '');
    const email = payload['email'] || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
      Action: 'ListRef',
      Query: '"owner" = \'' + email + '\''
    });
  }

  initialize(serviceId?: string): void {
    if (serviceId) {
      this.currentServiceRunsId = serviceId;
    }
    this.loadProcesses();
  }

  private loadProcesses(): void {
    const checkServices = () => {
      if (this.servicesService.allServices?.length > 0 && this.servicesService.allServices[0]?.services?.length > 0) {
        this.fetchAndMapRuns();
      } else {
        setTimeout(checkServices, 500);
      }
    };
    checkServices();
  }

  private fetchAndMapRuns(): void {
    const headers = this.getHeaders();

    this.http.get<any>(`${this.baseUrl}/Process/list`, { headers }).subscribe(
      (response) => {
        const items = response.Items || [];

        this.serviceRuns = items
          .filter((item: any) => {
            const sk = item.SK || '';
            if (!sk.startsWith('Process#') && !sk.startsWith('PTV#')) return false;
            const owner = item.owner || '';
            if (owner === 'SmartDataScheduler' || owner === 'system') return false;
            const name = item.name || '';
            if (name === 'AspireHR') return false;
            return true;
          })
          .map((item: any) => this.mapToServiceRun(item));

        console.log('Loaded process runs:', this.serviceRuns.length);
        this.serviceRuns$.next(this.serviceRuns);
        this.serviceRunsUpdated$.next();
      },
      (error) => {
        console.error('Error loading process runs:', error);
      }
    );
  }

  private mapToServiceRun(item: any): ServiceRun {
    const run = new ServiceRun();

    run.id = (item.SK || '').replace('Process#', '').replace('PTV#', '');

    // Task name = item.name (user-defined name like "Run1")
    run.taskName = item.name || '';

    // Process type name = resolved from referencedObjects GUID
    run.serviceName = this.getProcessNameByScheduledProcessKey(item.referencedObjects);

    // Fallbacks for service name
    if (!run.serviceName && item.referencedObjects?.ssObjectKey) {
      run.serviceName = 'HeartBeat';
    }
    if (!run.serviceName && !item.referencedObjects) {
      run.serviceName = item.name || 'Unknown Process';
    }

    // Service ID from referencedObjects
    run.serviceId = this.getScheduledProcessId(item.referencedObjects);

    // Status - as array for compatibility with history component
    const statusRaw = item.status || item.statusIndex || '';
    const statusEnum = this.getStatusEnum(statusRaw);
    run.status = [statusEnum];
    run.statusIndex = this.getStatusIndex(statusRaw);

    // Dates
    const submittedDate = item.createdAt || item.lastModifiedAt || '';
    run.submittedDate = submittedDate ? new Date(submittedDate) : new Date();

    const lastUpdated = item.lastModifiedAt || '';
    run.lastUpdated = lastUpdated ? new Date(lastUpdated) : run.submittedDate;

    // Duration
    if (run.submittedDate && run.lastUpdated) {
      const diffMs = run.lastUpdated.getTime() - run.submittedDate.getTime();
      run.durationHours = diffMs / (1000 * 60 * 60);
    }

    // Owner
    run.owner = item.owner || '';
    run.userName = item.owner || '';
    run.userId = item.owner || '';

    // Input parameters
    run.inputParameters = item.inputParameters || [];

    // Comment
    run.comment = item.comment || '';

    // Results (if available)
    run.results = item.results || item.outputResults || [];

    return run;
  }

  private getProcessNameByScheduledProcessKey(referencedObjects: any): string {
    if (!referencedObjects?.ssObjectKey) return '';

    const ssObjectKey = referencedObjects.ssObjectKey;
    const spMatch = ssObjectKey.match(/ScheduledProcess#[a-f0-9-]+/);
    if (!spMatch) return '';

    const spKey = spMatch[0];
    const allServices = this.servicesService.allServices;

    if (!allServices || allServices.length === 0 || !allServices[0]?.services) return '';

    const service = allServices[0].services.find((s: any) => s.id === spKey);
    return service?.name || '';
  }

  private getScheduledProcessId(referencedObjects: any): string {
    if (!referencedObjects?.ssObjectKey) return '';

    const ssObjectKey = referencedObjects.ssObjectKey;
    const spMatch = ssObjectKey.match(/ScheduledProcess#[a-f0-9-]+/);
    if (!spMatch) return '';

    return spMatch[0];
  }

  private getStatusEnum(status: string): ServiceRunStatus {
    if (!status) return ServiceRunStatus.Missing;
    const s = status.toLowerCase();
    if (s === 'completed' || s === '3') return ServiceRunStatus.Completed;
    if (s === 'processing' || s === '1' || s === '2') return ServiceRunStatus.Processing;
    if (s === 'error' || s === 'failed' || s === '4') return ServiceRunStatus.Error;
    if (s === 'queued' || s === '0') return ServiceRunStatus.Queued;
    if (s === 'cancelled' || s === '5') return ServiceRunStatus.Cancelled;
    if (s === 'missing') return ServiceRunStatus.Missing;
    if (s === 'scheduled') return ServiceRunStatus.Scheduled;
    return ServiceRunStatus.Missing;
  }

  private getStatusIndex(status: string): number {
    const s = (status || '').toLowerCase();
    if (s === 'completed' || s === '3') return 3;
    if (s === 'processing' || s === '2') return 2;
    if (s === '1') return 1;
    if (s === 'error' || s === 'failed' || s === '4') return 4;
    if (s === 'queued' || s === '0') return 0;
    if (s === 'cancelled' || s === '5') return 5;
    return 0;
  }

  // --- Public methods used by history.component.ts ---

  getServiceRuns(): ServiceRun[] {
    if (this.currentServiceRunsId && this.currentServiceRunsId !== 'all') {
      const targetId = this.currentServiceRunsId;
      return this.serviceRuns.filter(run => {
        if (!run.serviceId) return false;
        const runUuid = run.serviceId.replace('ScheduledProcess#', '');
        return run.serviceId === targetId ||
          runUuid === targetId ||
          targetId.includes(runUuid) ||
          run.serviceId.includes(targetId);
      });
    }
    return this.serviceRuns;
  }

  filterServiceRuns(searchString: string, filtersObj: any): ServiceRun[] {
    let filtered = this.getServiceRuns();

    // Filter by status
    if (filtersObj.status && filtersObj.status.length > 0) {
      filtered = filtered.filter(run => {
        return run.status.some(s => filtersObj.status.includes(s));
      });
    }

    // Filter by owner
    if (filtersObj.owner && filtersObj.owner.length > 0) {
      filtered = filtered.filter(run => {
        return filtersObj.owner.includes(run.owner);
      });
    }

    // Filter by date range
    if (filtersObj.dateRange && filtersObj.dateRange.start && filtersObj.dateRange.end) {
      const start = new Date(filtersObj.dateRange.start).getTime();
      const end = new Date(filtersObj.dateRange.end).getTime();
      if (start > 0 && end > 0) {
        filtered = filtered.filter(run => {
          const runTime = run.submittedDate.getTime();
          return runTime >= start && runTime <= end;
        });
      }
    }

    // Filter by service
    if (filtersObj.service && filtersObj.service.length > 0) {
      filtered = filtered.filter(run => {
        return filtersObj.service.includes(run.serviceName);
      });
    }

    // Search string
    if (searchString && searchString.trim() !== '') {
      const search = searchString.toLowerCase();
      filtered = filtered.filter(run => {
        return (
          run.serviceName.toLowerCase().includes(search) ||
          run.taskName.toLowerCase().includes(search) ||
          run.owner.toLowerCase().includes(search) ||
          run.comment.toLowerCase().includes(search)
        );
      });
    }

    this.filtersActive = filtersObj.status?.length > 0 ||
      filtersObj.owner?.length > 0 ||
      (filtersObj.dateRange?.start?.getTime() > 0) ||
      filtersObj.service?.length > 0;

    return filtered;
  }

  get serviceRunsFilters(): any[] {
    const services = [...new Set(this.serviceRuns.map(r => r.serviceName).filter(n => n))];
    const owners = [...new Set(this.serviceRuns.map(r => r.owner).filter(n => n))];
    return [
      {
        name: 'Status',
        filters: [
          { name: 'Completed' },
          { name: 'Processing' },
          { name: 'Processed with Errors' },
        ],
      },
      {
        name: 'Service',
        filters: services.map(s => ({ name: s })),
      },
      {
        name: 'Owner',
        filters: owners.map(o => ({ name: o })),
      },
    ];
  }

  get singleServiceRunsFilters(): any[] {
    return [
      {
        name: 'Status',
        filters: [
          { name: 'Completed' },
          { name: 'Processing' },
          { name: 'Processed with Errors' },
        ],
      },
      {
        name: 'Service',
        filters: [...new Set(this.serviceRuns.map(r => r.serviceName).filter(n => n))].map(s => ({ name: s })),
      },
    ];
  }

  // --- Methods used by cancel and results components ---

  cancelServiceRun(serviceId: string): Observable<any> {
    const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    const token = idTokenKey ? localStorage.getItem(idTokenKey) || '' : '';

    let partition = '';
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || '').replace(/#$/, '');
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
      Action: 'Cancel',
    });

    return this.http.post<any>(`${this.baseUrl}/Process/${serviceId}/cancel`, {}, { headers });
  }

  getProcessDetails(processId: string): Observable<any> {
    const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    const token = idTokenKey ? localStorage.getItem(idTokenKey) || '' : '';

    let partition = '';
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || '').replace(/#$/, '');
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
      Action: 'ListRef',
      Query: '"SK" = \'Process#' + processId + '\''
    });

    return this.http.get<any>(`${this.baseUrl}/Process/list`, { headers });
  }

  getResultsForRun(runId: string): ServiceRun | undefined {
    return this.serviceRuns.find(r => r.id === runId);
  }

  refresh(): void {
    this.loadProcesses();
  }
}

