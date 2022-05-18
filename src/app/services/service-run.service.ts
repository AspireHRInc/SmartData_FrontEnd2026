import { Injectable } from '@angular/core';
import { File } from './file.service';
import { UserService } from './user.service';
import servicesRunData from './service-run.data.json';

export enum ServiceRunStatus {
  'none' = 'none',
  'Scheduled' = 'Scheduled',
  'Processing' = 'Processing',
  'Processed with Errors' = 'Processed with Errors',
  'Completed' = 'Completed',
}

export class ServiceRun {
  id = '0';
  userId = 0;
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
  serviceRuns: ServiceRun[] = servicesRunData.serviceRuns.map(serviceRun => {
    return {
      ...serviceRun,
      status: serviceRun.status.map(status => status as ServiceRunStatus),
      submittedDate: new Date(serviceRun.submittedDate),
      startDate: new Date(serviceRun.startDate),
      endDate: new Date(serviceRun.endDate),
      results: serviceRun.results?.map(result => {
        return { ...result, createDate: new Date(result.createDate) } as ServiceRunResult;
      }),
    };
  });

  singleServiceRuns: ServiceRun[] = servicesRunData.singleServiceRuns.map(serviceRun => {
    return {
      ...serviceRun,
      status: serviceRun.status.map(status => status as ServiceRunStatus),
      submittedDate: new Date(serviceRun.submittedDate),
      startDate: new Date(serviceRun.startDate),
      endDate: new Date(serviceRun.endDate),
      results: serviceRun.results?.map(result => {
        return { ...result, createDate: new Date(result.createDate) } as ServiceRunResult;
      }),
    };
  });

  serviceRunsFilters: FilterGroup[] = servicesRunData.serviceRunsFilters;

  singleServiceRunsFilters: FilterGroup[] = servicesRunData.singleServiceRunsFilters;

  constructor(private userService: UserService) {}

  currentServiceRunsId = 'all';

  currentServicesRuns: ServiceRun[] = [...this.getServiceRuns()];

  currentFilters: string[] = [];

  filtersActive = false;

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
    // every
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
          // let tags = service.metaTags.map(tag => tag.name);
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
      console.log('else');
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
