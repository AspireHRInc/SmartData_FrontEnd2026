import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ServicesService } from './services.service';
import { DateTimeService } from './date-time.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

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

  private baseUrl = environment.apiUrl;
  private loading = false;
  private initialized = false;
  private currentDateStart: string = '';
  private currentDateEnd: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private servicesService: ServicesService,
    private dateTimeService: DateTimeService
  ) {}

  private getTodayRange(): { start: string; end: string } {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return {
      start: startOfDay.toISOString(),
      end: endOfDay.toISOString()
    };
  }

  private getHeaders(dateStart?: string, dateEnd?: string): HttpHeaders {
    //const keys = Object.keys(localStorage);
    //const idTokenKey = keys.find(k => k.includes('idToken'));
    //const token = idTokenKey ? localStorage.getItem(idTokenKey) || '' : '';
    const token = this.authService.getIdToken();

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

    const effectiveDateStart = dateStart || this.currentDateStart;
    const effectiveDateEnd = dateEnd || this.currentDateEnd;

    let query = '"PK" = \'' + partition + '\' AND "owner" = \'' + email + '\'';

    if (effectiveDateStart && effectiveDateEnd) {
      query += ' AND "lastModifiedAt" >= \'' + effectiveDateStart + '\' AND "lastModifiedAt" <= \'' + effectiveDateEnd + '\'';
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
      Action: 'ListRef',
      Query: query
    });
  }

  private getMinimalHeaders(): HttpHeaders {
    const token = this.authService.getIdToken();

    if (!token) {
      return new HttpHeaders({ Authorization: '', Partition: '' });
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return new HttpHeaders({ Authorization: `Bearer ${token}`, Partition: '' });
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const partition = (payload['custom:Org'] || '').replace(/#$/, '');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition
    });
  }

  
  private getTokenPayload(): any {
    const token = this.authService.getIdToken();
    
    if (!token) return {};
    const parts = token.split('.');
    if (parts.length !== 3) return {};
    return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
  }

  private parseUTCDate(value: any): Date | null {
    if (!value) return null;

    if (typeof value === 'number') {
      const ms = value < 10000000000 ? value * 1000 : value;
      return new Date(ms);
    }

    let dateStr = String(value).trim();

    if (dateStr && !dateStr.endsWith('Z') && !dateStr.match(/[+-]\d{2}:\d{2}$/) && !dateStr.match(/[+-]\d{4}$/)) {
      dateStr += 'Z';
    }

    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private toSlug(name: string): string {
    return (name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  initialize(serviceId?: string): void {
    if (serviceId) {
      this.currentServiceRunsId = serviceId;
    }
    if (this.initialized || this.loading) return;
    this.loading = true;

    const today = this.getTodayRange();
    this.currentDateStart = today.start;
    this.currentDateEnd = today.end;

    this.loadProcesses();
  }
  reset(): void {
  this.initialized = false;
  this.loading = false;
}


  refreshWithDateRange(startDate: Date, endDate: Date): void {
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);

    this.currentDateStart = start.toISOString();
    this.currentDateEnd = end.toISOString();

    this.initialized = false;
    this.loading = true;
    this.loadProcesses();
  }

  clearDateFilter(): void {
    this.currentDateStart = '';
    this.currentDateEnd = '';
    this.initialized = false;
    this.loading = true;
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
            if (!item.referencedObjects?.ssObjectKey) return false;
            return true;
          })
          .map((item: any) => this.mapToServiceRun(item));

        console.log('Loaded process runs:', this.serviceRuns.length);
        this.serviceRuns$.next(this.serviceRuns);
        this.loading = false;
        this.initialized = true;
        this.serviceRunsUpdated$.next();
      },
      (error) => {
        console.error('Error loading process runs:', error);
        this.loading = false;
        this.initialized = true;
        this.serviceRunsUpdated$.next();
      }
    );
  }

  private mapToServiceRun(item: any): ServiceRun {
    const run = new ServiceRun();

    run.id = (item.SK || '').replace('Process#', '').replace('PTV#', '');
    run.taskName = item.name || '';
    run.serviceName = this.getProcessNameByScheduledProcessKey(item.referencedObjects);

    if (!run.serviceName) {
      run.serviceName = 'Unknown Process';
    }

    run.serviceId = this.getScheduledProcessId(item.referencedObjects);

    const statusRaw = item.status || item.statusIndex || '';
    const statusEnum = this.getStatusEnum(statusRaw);
    run.status = [statusEnum];
    run.statusIndex = this.getStatusIndex(statusRaw);

    const submittedRaw = item.startTime || item.submittedDate || item.created || item.createdAt || item.lastModifiedAt || '';
    const parsedSubmitted = this.parseUTCDate(submittedRaw);
    run.submittedDate = parsedSubmitted || new Date();

    const lastUpdatedRaw = item.endTime || item.lastModifiedAt || '';
    const parsedLastUpdated = this.parseUTCDate(lastUpdatedRaw);
    run.lastUpdated = parsedLastUpdated || run.submittedDate;

    if (run.submittedDate && run.lastUpdated) {
      const diffMs = run.lastUpdated.getTime() - run.submittedDate.getTime();
      run.durationHours = Math.max(0, diffMs / (1000 * 60 * 60));
    }

    run.owner = item.owner || '';
    run.userName = item.owner || '';
    run.userId = item.owner || '';
    run.inputParameters = item.inputParameters || [];
    run.comment = item.comment || '';

    const inputParams = item.inputParameters || [];
    run.results = inputParams
      .filter((p: any) => p.name !== 'Comment')
      .map((p: any) => ({
        id: p.name,
        type: 'parameter',
        label: p.parameterMetadata?.caption || p.name,
        textResult: p.value || p.defaultValue || ''
      }));

    return run;
  }

  private getProcessNameByScheduledProcessKey(referencedObjects: any): string {
    if (!referencedObjects?.ssObjectKey) return '';

    const ssObjectKey = referencedObjects.ssObjectKey;
    const spMatch = ssObjectKey.match(/(?:ScheduledProcess|CPT)#[a-fA-F0-9-]+/i);
    if (!spMatch) return '';

    const spKey = spMatch[0];
    const allServices = this.servicesService.allServices;

    if (!allServices || allServices.length === 0) return '';

    for (let i = 0; i < allServices.length; i++) {
      if (!allServices[i]?.services) continue;
      const service = allServices[i].services.find((s: any) => s.id === spKey);
      if (service) return service.name || '';
    }

    return '';
  }

  private getScheduledProcessId(referencedObjects: any): string {
    if (!referencedObjects?.ssObjectKey) return '';

    const ssObjectKey = referencedObjects.ssObjectKey;
    const spMatch = ssObjectKey.match(/(?:ScheduledProcess|CPT)#[a-fA-F0-9-]+/i);
    if (!spMatch) return '';

    return spMatch[0];
  }

  private getStatusEnum(status: string): ServiceRunStatus {
    if (!status) return ServiceRunStatus.Missing;
    const s = status.toLowerCase();
    if (s === 'completed' || s === '3') return ServiceRunStatus.Completed;
    if (s === 'processing' || s === '1' || s === '2') return ServiceRunStatus.Processing;
    if (s === 'error' || s === 'failed' || s === '4') return ServiceRunStatus.Error;
    if (s === 'processed with errors') return ServiceRunStatus['Processed with Errors'];
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

  getServiceRuns(): ServiceRun[] {
    if (this.currentServiceRunsId && this.currentServiceRunsId !== 'all') {
      const targetId = this.currentServiceRunsId;
      const targetSlug = this.toSlug(targetId);

      const allServices = this.servicesService.allServices;
      if (allServices?.length > 0) {
        for (let i = 0; i < allServices.length; i++) {
          const serviceGroup = allServices[i];
          if (!serviceGroup?.services?.length) continue;

          const matchedService = serviceGroup.services.find((s: any) => {
            if (this.toSlug(s.name) === targetSlug) return true;
            if (s.id === targetId) return true;
            const bareId = (s.id || '').replace('CPT#', '');
            if (bareId === targetId) return true;
            return false;
          });

          if (matchedService) {
            const scheduledProcessKey = matchedService.id;
            return this.serviceRuns.filter(run => run.serviceId === scheduledProcessKey);
          }
        }
      }

      return this.serviceRuns.filter(run => {
        if (!run.serviceId && !run.serviceName) return false;
        return run.serviceId === targetId ||
          run.serviceId.replace('CPT#', '') === targetId ||
          this.toSlug(run.serviceName) === targetSlug;
      });
    }
    return this.serviceRuns;
  }

  filterServiceRuns(searchString: string, filtersObj: any): ServiceRun[] {
    let filtered = this.getServiceRuns();

    if (filtersObj.status && filtersObj.status.length > 0) {
      filtered = filtered.filter(run => {
        return run.status.some(s => filtersObj.status.includes(s));
      });
    }

    if (filtersObj.owner && filtersObj.owner.length > 0) {
      filtered = filtered.filter(run => {
        return filtersObj.owner.includes(run.owner);
      });
    }

    if (filtersObj.service && filtersObj.service.length > 0) {
      filtered = filtered.filter(run => {
        return filtersObj.service.includes(run.serviceName);
      });
    }

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
        name: 'Date Range',
        filters: [],
      },
      {
        name: 'Owner',
        filters: owners.map(o => ({ name: o })),
      },
    ];
  }

  get singleServiceRunsFilters(): any[] {
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
        name: 'Date Range',
        filters: [],
      },
      {
        name: 'Owner',
        filters: owners.map(o => ({ name: o })),
      },
    ];
  }

  cancelServiceRun(processId: string): Observable<any> {
    return new Observable(observer => {
      const uuid = processId.includes('#') ? processId.split('#')[1] : processId;
      const headers = this.getMinimalHeaders();
      const payload = this.getTokenPayload();
      const username = payload['email'] || payload['cognito:username'] || '';

      this.http.get<any>(`${this.baseUrl}/Process/${uuid}`, { headers }).subscribe(
        (response: any) => {
          const items = response.Items || [];
          if (items.length === 0) {
            observer.error('Process not found');
            return;
          }

          const item = items[0];

          const updatedItem = {
            ...item,
            status: 'Cancelled',
            lastModifiedAt: new Date().toISOString(),
            lastModifiedBy: username
          };

          delete updatedItem.PK;
          delete updatedItem.SK;

          const postHeaders = this.getMinimalHeaders()
            .set('lastmodifiedcached', 'new');

          this.http.post<any>(`${this.baseUrl}/Process/${uuid}`, updatedItem, { headers: postHeaders }).subscribe(
            (postResponse) => {
              console.log('Process cancelled successfully');
              observer.next(postResponse);
              observer.complete();
              this.refresh();
            },
            (postError) => {
              console.error('Error cancelling process:', postError);
              observer.error(postError);
            }
          );
        },
        (getError) => {
          console.error('Error fetching process for cancel:', getError);
          observer.error(getError);
        }
      );
    });
  }

  getProcessDetails(processId: string): Observable<any> {
    const headers = this.getMinimalHeaders();
    const uuid = processId.includes('#') ? processId.split('#')[1] : processId;

    console.log('Fetching process details for UUID:', uuid);
    return this.http.get<any>(`${this.baseUrl}/Process/${uuid}`, { headers });
  }

  getResultsForRun(runId: string): ServiceRun | undefined {
    return this.serviceRuns.find(r => r.id === runId);
  }

  refresh(): void {
    this.initialized = false;
    this.loading = true;
    this.loadProcesses();
  }
}

