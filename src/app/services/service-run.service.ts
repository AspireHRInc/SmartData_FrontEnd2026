import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

export enum ServiceRunStatus {
  'none' = 'none',
  'Scheduled' = 'Scheduled',
  'Processing' = 'Processing',
  'Processed with Errors' = 'Processed with Errors',
  'Completed' = 'Completed',
  'Missing' = 'Missing',
  'Error' = 'Error',
}

export class ServiceRun {
  id = '0';
  userId = '0';
  userName = '';
  processCode = '';
  targetSystemId = '';
  serviceId = '';
  serviceName = '';
  status: ServiceRunStatus[] = [ServiceRunStatus.none];
  submittedDate = new Date();
  startDate = new Date();
  endDate = new Date();
  durationHours = 0;
  newlyCompleted = false;
  comment = '';
  type = '';
  results?: ServiceRunResult[] = [];
  parameters: ServiceRunParameter[] = [];
  info?: (infoItem | ServiceRunResult)[] = [];

  constructor() {}
}

export class infoItem {
  id = '';
  type = '';
  label = '';
  detail = '';
}

export class ServiceRunResult {
  id = '';
  type = '';
  label = '';
  fileName?: string;
  filePath?: string;
  createDate? = new Date();
  textResult? = '';
}

export class ServiceRunParameter {
  parameterName = '';
  parameterType = '';
  caption = '';
  required? = true;
  defaultValue = '';
  templateS3Path = '';
  displayOrder = 0;
  options? = [];

  constructor() {}
}

export class FilterGroup {
  name = '';
  filters: Filter[] = [];
}

export class Filter {
  value?: string | number;
  name = '';
}

export class Filters {
  dateRange = { start: new Date(0), end: new Date(0) };
  requester: string[] = [];
  service: string[] = [];
  status: string[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRunService {
  serviceRuns: ServiceRun[] = [];
  singleServiceRuns: ServiceRun[] = [];
  serviceRunsFilters: FilterGroup[] = [];
  singleServiceRunsFilters: FilterGroup[] = [];
  currentServiceRunsId = 'all';
  currentServiceName = '';
  currentServicesRuns: ServiceRun[] = [];
  currentFilters: string[] = [];
  filtersActive = false;
  private initialized = false;

  // Track the last executed service name to apply to unnamed items
  lastExecutedServiceName = '';
  private currentUsername = '';

  serviceRunsUpdated$ = new Subject<void>();

  private apiBase = '/api';

  constructor(private userService: UserService, private http: HttpClient, private servicesService: ServicesService) {
    // Get current username from token
    try {
      const idToken = this.getIdToken();
      if (idToken && idToken.split('.').length === 3) {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        this.currentUsername = payload['cognito:username'] || payload['email'] || '';
      }
    } catch (e) {}
  }
  private getProcessNameById(processId: string): string {
    const allServices = this.servicesService.allServices;

    if(!allServices || allServices.length === 0) {
      return 'Unnamed Process';
    }
     const service = allServices[0].services.find(s => s.id === processId);
    return service?.name || 'Unnamed Process';
    }


  private getIdToken(): string {
    const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    if (idTokenKey) {
      return localStorage.getItem(idTokenKey) || '';
    }
    return '';
  }

  private getHeaders(): HttpHeaders {
    const idToken = this.getIdToken();

    let partition = 'Org#99889cf5-670f-4460-8461-7556e88505d4';
    try {
      if (idToken && idToken.split('.').length === 3) {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || partition).replace(/#$/, '');
      }
    } catch (e) {
      console.warn('Could not decode token for Partition header');
    }

    return new HttpHeaders({
      'Authorization': idToken,
      'Partition': partition
    });
  }

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.loadProcesses();
  }

  refresh(): void {
    this.loadProcesses();
  }

  private loadProcesses(): void {
  const headers = this.getHeaders();

  this.http.get<any>(`${this.apiBase}/Process/list`, { headers }).subscribe(
    (response) => {
      const items = response.Items || [];
      const newRuns = items.map((item: any) => this.mapToServiceRun(item));

      // Sort by date descending
      newRuns.sort((a: ServiceRun, b: ServiceRun) => b.submittedDate.getTime() - a.submittedDate.getTime());

      // Only update if data actually changed (prevents flicker on identical refreshes)
      if (newRuns.length !== this.serviceRuns.length || 
          (newRuns[0] && this.serviceRuns[0] && newRuns[0].id !== this.serviceRuns[0].id) ||
          (newRuns[0] && this.serviceRuns[0] && newRuns[0].status[0] !== this.serviceRuns[0].status[0])) {
        this.serviceRuns = newRuns;
        this.singleServiceRuns = [...this.serviceRuns];
        this.currentServicesRuns = [...this.serviceRuns];
        this.serviceRunsFilters = this.buildFilters(this.serviceRuns);
        this.singleServiceRunsFilters = this.buildFilters(this.singleServiceRuns);
        this.serviceRunsUpdated$.next();
      }

      console.log('Loaded process runs:', this.serviceRuns.length);
    },
    (error) => console.error('Error loading processes:', error)
  );
}


  getProcessDetails(processId: string) {
    const headers = this.getHeaders();
    const uuid = processId.includes('#') ? processId.split('#')[1] : processId;
    console.log('Fetching process details for UUID:', uuid);
    return this.http.get<any>(`${this.apiBase}/Process/${uuid}`, { headers });
  }

  private mapToServiceRun(item: any): ServiceRun {
  const id = item.SK;
  const sk = item.SK || '';
  const created = item.created || item.lastModifiedAt || '';
  const status = this.mapStatus(item.status);
  const owner = item.owner || '';
  const name = item.name || '';

  const startDate = new Date(created || Date.now());
  const endDate = item.completedAt ? new Date(item.completedAt) : new Date(item.lastModifiedAt || created || Date.now());
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = durationMs > 0 ? durationMs / (1000 * 60 * 60) : 0;

  const inputParams = item.inputParameters || [];
  const commentParam = inputParams.find((p: any) => p.name === 'Comment');
  const comment = commentParam?.value || '';

  // Determine serviceName with fallback chain
  let serviceName = name;  // First: try item.name from DynamoDB

  if (!serviceName || serviceName === 'Unnamed Process') {
    // Second: look it up from ServicesService
    serviceName = this.getProcessNameById(id);
  }

  if (!serviceName || serviceName === 'Unnamed Process') {
    // Third: if recently created, use lastExecutedServiceName
    const itemAge = Date.now() - startDate.getTime();
    if (itemAge < 120000 && this.lastExecutedServiceName) {
      serviceName = this.lastExecutedServiceName;
    }
  }

  if (!serviceName || serviceName === 'Unnamed Process') {
    // Fourth: fallback to owner
    serviceName = owner || 'Unnamed Process';
  }

  return {
    id: sk,
    userId: '0',
    userName: owner,
    processCode: '',
    targetSystemId: '',
    serviceId: name,
    serviceName: serviceName,
    status: [status],
    submittedDate: startDate,
    startDate: startDate,
    endDate: endDate,
    durationHours: durationHours,
    newlyCompleted: false,
    comment: comment,
    type: '',
    results: [],
    parameters: inputParams.map((p: any) => ({
      parameterName: p.name || '',
      parameterType: p.parameterMetadata?.parameterType || 'text',
      caption: p.parameterMetadata?.caption || p.name || '',
      required: p.parameterMetadata?.required || false,
      defaultValue: p.defaultValue || '',
      templateS3Path: '',
      displayOrder: p.parameterMetadata?.displayOrder || 0,
      options: [],
    })),
    info: [],
  };
}

  private mapStatus(status: string | string[]): ServiceRunStatus {
    const statusStr: string = Array.isArray(status) ? (status[0] || 'none') : (status || 'none');

    switch (statusStr.toLowerCase()) {
      case 'completed':
      case 'complete':
      case 'success':
        return ServiceRunStatus.Completed;
      case 'processing':
      case 'running':
      case 'in progress':
        return ServiceRunStatus.Processing;
      case 'error':
      case 'failed':
        return ServiceRunStatus.Error;
      case 'processed with errors':
        return ServiceRunStatus['Processed with Errors'];
      case 'scheduled':
        return ServiceRunStatus.Scheduled;
      case 'missing':
        return ServiceRunStatus.Missing;
      default:
        return ServiceRunStatus.none;
    }
  }

  private buildFilters(runs: ServiceRun[]): FilterGroup[] {
    const statuses = [...new Set(runs.flatMap(r => r.status))];
    const services = [...new Set(runs.map(r => r.serviceName).filter(n => n && n !== 'Unnamed Process'))];
    const requesters = [...new Set(runs.map(r => r.userName).filter(n => n))];

    return [
      { name: 'Status', filters: statuses.map(s => ({ name: s, value: s })) },
      { name: 'Service', filters: services.map(s => ({ name: s, value: s })) },
      { name: 'Requester', filters: requesters.map(r => ({ name: r, value: r })) },
      { name: 'Date Range', filters: [] },
    ];
  }

  filterServiceRuns(searchString: string, filters: Filters) {
    this.currentServicesRuns = [...this.getServiceRuns()];

    this.filtersActive = false;

    if (
      filters.status.length > 0 ||
      filters.service.length > 0 ||
      filters.requester.length > 0 ||
      filters.dateRange.start.toString() !== new Date(0).toString()
    ) {
      this.filtersActive = true;
    }

    if (filters.status.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.status.some((status: any) => run.status.includes(status));
        }),
      ];
    }

    if (filters.requester.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.requester.some(
            (requesterName: string) => run.userName === requesterName || this.userService.getUserFullNameById(run.userId) === requesterName
          );
        }),
      ];
    }

    if (filters.service.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.service.some((serviceName: string) => run.serviceName.includes(serviceName));
        }),
      ];
    }

    if (filters.dateRange.start.getTime() !== new Date(0).getTime()) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return (
            run.submittedDate.getTime() >= filters.dateRange.start.getTime() &&
            run.submittedDate.getTime() <= filters.dateRange.end.getTime()
          );
        }),
      ];
    }

    if (searchString !== '') {
      let searchStringArr: string[] = searchString.toLocaleLowerCase().split(' ');

      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return searchStringArr.every(
            searchWord =>
              run.serviceName.toLocaleLowerCase().includes(searchWord) ||
              run.comment.toString().toLowerCase().includes(searchWord) ||
              run.userName.toString().toLowerCase().includes(searchWord)
          );
        }),
      ];
      return [...this.currentServicesRuns];
    }

    if (searchString === '' && !this.filtersActive) {
      this.currentServicesRuns = [...this.getServiceRuns()];
      return this.currentServicesRuns;
    }

    return this.currentServicesRuns;
  }

  cancelServiceRun(id: string): Observable<any> {
  const headers = this.getHeaders();
  const uuid = id.includes('#') ? id.split('#')[1] : id;
  
  console.log('Canceling process:', uuid);
  
  // Find the run in memory to get its lastModifiedAt
  const run = this.serviceRuns.find(r => r.id.includes(uuid));
  if (!run) {
    return new Observable(obs => {
      obs.error('Run not found');
      obs.complete();
    });
  }
  
  // Add LastModifiedCached header so the Lambda's condition check passes
  const headersWithCache = headers.set('LastModifiedCached', run.submittedDate.toISOString());
  
  // POST with status update
  return this.http.post<any>(
    `${this.apiBase}/Process/${uuid}`,
    { status: 'Cancelled' },
    { headers: headersWithCache }
  );
}




  getServiceRuns(): ServiceRun[] {
    if (this.currentServiceRunsId === 'all') {
      return (this.currentServicesRuns = [...this.serviceRuns]);
    } else {
      // Filter by service name — matches items whose name matches the current tile
      // Also include items with no name (unnamed) that might belong to this service
      const filterName = this.currentServiceName.toLowerCase();
      return (this.currentServicesRuns = [
        ...this.serviceRuns.filter(run => {
          const runName = run.serviceName.toLowerCase();
          const runServiceId = run.serviceId.toLowerCase();
          return runName === filterName ||
                 runServiceId === filterName ||
                 (runName === run.userName.toLowerCase() && run.serviceId === '');
                 // ^ includes unnamed items (where serviceName fell back to owner)
        })
      ]);
    }
  }
}
