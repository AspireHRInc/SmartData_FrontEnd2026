import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

export enum ServiceRunStatus {
  'none' = 'none',
  'Scheduled' = 'Scheduled',
  'Processing' = 'Processing',
  'Processed with Errors' = 'Processed with Errors',
  'Completed' = 'Completed',
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
  requester = [];
  service = [];
  status = [];
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
  currentServicesRuns: ServiceRun[] = [];
  currentFilters: string[] = [];
  filtersActive = false;
  private initialized = false;

  constructor(private userService: UserService, private http: HttpClient) {}

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.loadProcesses();
  }

  private loadProcesses(): void {
    this.http.get<any>('/api/Process/list').subscribe(
      (response) => {
        const items = response.Items || [];
        this.serviceRuns = items.map((item: any) => this.mapToServiceRun(item));
        this.singleServiceRuns = [...this.serviceRuns];
        this.currentServicesRuns = [...this.serviceRuns];

        // Build filters from data
        this.serviceRunsFilters = this.buildFilters(this.serviceRuns);
        this.singleServiceRunsFilters = this.buildFilters(this.singleServiceRuns);
      },
      (error) => console.error('Error loading processes:', error)
    );
  }

  private mapToServiceRun(item: any): ServiceRun {
    return {
      id: item.SK || item.id || '0',
      userId: item.userId || '0',
      userName: item.userName || '',
      processCode: item.processCode || '',
      targetSystemId: item.targetSystemId || '',
      serviceId: item.serviceId || item.processTypeId || '',
      serviceName: item.serviceName || item.processTypeName || '',
      status: (item.status || ['none']).map((s: string) => s as ServiceRunStatus),
      submittedDate: new Date(item.submittedDate || Date.now()),
      startDate: new Date(item.startDate || Date.now()),
      endDate: new Date(item.endDate || Date.now()),
      durationHours: item.durationHours || 0,
      newlyCompleted: item.newlyCompleted || false,
      comment: item.comment || '',
      type: item.type || '',
      results: (item.results || []).map((r: any) => ({
        ...r,
        createDate: new Date(r.createDate || Date.now()),
      })),
      parameters: item.parameters || [],
      info: item.info || [],
    };
  }

  private buildFilters(runs: ServiceRun[]): FilterGroup[] {
    const statuses = [...new Set(runs.flatMap(r => r.status))];
    const services = [...new Set(runs.map(r => r.serviceName).filter(n => n))];
    const requesters = [...new Set(runs.map(r => r.userName).filter(n => n))];

    return [
      { name: 'Status', filters: statuses.map(s => ({ name: s, value: s })) },
      { name: 'Service', filters: services.map(s => ({ name: s, value: s })) },
      { name: 'Requester', filters: requesters.map(r => ({ name: r, value: r })) },
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
          return filters.status.some(status => run.status.includes(status));
        }),
      ];
    }

    if (filters.requester.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.requester.some(
            requesterName => this.userService.getUserFullNameById(run.userId) === requesterName
          );
        }),
      ];
    }

    if (filters.service.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.service.some(serviceName => run.serviceName.includes(serviceName));
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

  cancelServiceRun(id: string) {
    console.log('cancel service run ', id);
  }

  getServiceRuns(): ServiceRun[] {
    if (this.currentServiceRunsId === 'all') {
      return (this.currentServicesRuns = [...this.serviceRuns]);
    } else {
      return (this.currentServicesRuns = [...this.singleServiceRuns]);
    }
  }
}

