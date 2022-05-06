import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import {
  ServiceRunService,
  ServiceRun,
  ServiceRunStatus,
  FilterGroup,
  Filter,
} from 'src/app/services/service-run.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { AccentColor } from 'src/app/services/color.service';

import { SelectionRange } from '@progress/kendo-angular-dateinputs';

export class ServiceRunExtended extends ServiceRun {
  userObject: User = new User();
  scheduled = false;
  statusColor = 'rgba(var(--color-text-secondary-rgb),0.2)';
  statusString = '';
  durationString = '';
}

@Component({
  selector: 'ss-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
  animations: [
    trigger('tileInOutAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  // @ViewChild("anchor") public anchor!: ElementRef;
  // @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef;

  // @HostListener("document:click", ["$event"])
  // documentClick(event: KeyboardEvent): void {
  //   if (!this.contains(event.target!)) {
  //     this.toggle(false);
  //   }
  // }

  // private contains(target: EventTarget): boolean {
  //   return (
  //     this.anchor.nativeElement.contains(target) ||
  //     (this.popup ? this.popup.nativeElement.contains(target) : false)
  //   );
  // }

  loggedInUserObj = new User();

  serviceRuns: ServiceRunExtended[] = [];

  searchField = '';
  searchFieldUpdate = new Subject<string>();

  processingStatusBarValue = 0;
  processingStatusBarDirection = true;

  statusBadgeColor = AccentColor.gray;

  showFilterPopupIndex = -1;

  filters: any[] = [];

  filtersFormGroup = this.fb.group({
    Status: this.fb.group({}),
  });

  selectedDateRangeFilter = { start: new Date(), end: new Date() };

  constructor(public userService: UserService, public serviceRunService: ServiceRunService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;

    this.serviceRuns = this.serviceRunService.serviceRuns.map(serviceRun => {
      return {
        ...serviceRun,
        status: serviceRun.status.filter(status => status !== ServiceRunStatus.Scheduled),
        statusString: serviceRun.status.filter(status => status !== ServiceRunStatus.Scheduled).toString(),
        comment: serviceRun.comment.slice(0, 60),
        userObject: this.userService.getUserById(serviceRun.userId)!,
        scheduled: serviceRun.status.includes(ServiceRunStatus.Scheduled),
        statusColor: serviceRun.status.includes(ServiceRunStatus.Completed)
          ? 'var(--color-cta)'
          : serviceRun.status.includes(ServiceRunStatus.Processing)
          ? 'var(--color-accent-6)'
          : serviceRun.status.includes(ServiceRunStatus['Processed with Errors'])
          ? 'var(--color-accent-2)'
          : '',
        durationString: DateTimeService.hoursToGreatesUnit(serviceRun.durationHours),
      };
    });

    this.filters = this.serviceRunService.serviceRunsFilters.map(filterGroup => {
      return {
        ...filterGroup,
        filters: filterGroup.filters!.map(filter => {
          return filter.name;
        }),
      };
    });

    this.animateProcessingStatusBar();

    this.filters.forEach(filterCategory => {
      this.filtersFormGroup.addControl(filterCategory.name, this.fb.group({}));

      filterCategory.filters.forEach((filter: any) => {
        (this.filtersFormGroup.get(filterCategory.name) as FormGroup).addControl(filter, new FormControl(false));
      });
    });
  }

  // ngAfterViewInit() {
  //   this.filtersFormGroup.valueChanges.subscribe(filterValues => {
  //     this.updateFilterValues(filterValues);
  //   });
  // }

  // updateFilterValues(filterValuesForm: any) {
  //   let transformedFilters = Object.entries(filterValuesForm).map(filter => {
  //     // return Object.keys(filter).find(key => filter[parseInt(key)] === true);
  //     let obj: { name: string; filters: any } = { name: '', filters: [] };
  //     obj.name = filter[0];
  //     obj.filters = filter[1] as [];

  //     obj.filters = Object.entries(obj.filters).map(([k, v]) => ({ [k]: v }));
  //     // console.log(obj.filters);
  //     obj.filters = obj.filters.filter((obj: any) => {
  //       if (Object.values(obj)[0] === true) {
  //         // console.log(Object.keys(obj)[0]);
  //         return String(Object.keys(obj)[0]);
  //       }
  //       return;
  //     });
  //     return obj;
  //   });

  //   // console.log(transformedFilters[0].filters);
  // }

  filtersObj: any = { status: [], requester: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] };

  searchString = '';

  filterActive = {};

  onCheckboxChange(filterGroup: string, filter: string) {
    if (!this.filtersObj[filterGroup.toLocaleLowerCase()].includes(filter)) {
      this.filtersObj[filterGroup.toLocaleLowerCase()].push(filter);
    } else {
      this.filtersObj[filterGroup.toLocaleLowerCase()] = this.filtersObj[filterGroup.toLocaleLowerCase()].filter(
        (value: string) => {
          return value !== filter;
        }
      );
    }
    this.onServiceFilter();
  }

  setFilterActive() {}

  onDateRangeValueChange(range: SelectionRange) {
    console.log(range);
    // console.log(this.selectedDateRangeFilter);
    this.filtersObj.dateRange = range;
    this.onServiceFilter();
  }

  onSearchStringUpdate(event: any) {
    this.searchString = event.target.value;
    this.onServiceFilter();
  }

  onServiceFilter(event: any = '') {
    // if (event.key === 'Enter' || event.type === 'click') {
    //   // this.services = this.servicesService.onServiceSearch(this.searchField);
    //   this.serviceRuns = this.getExtendedServices(this.serviceRunService.filterServiceRuns(event));
    // }

    this.serviceRuns = this.getExtendedServices(
      this.serviceRunService.filterServiceRuns(this.searchString, this.filtersObj)
    );
  }

  getExtendedServices(services: ServiceRun[]): ServiceRunExtended[] {
    let serviceRunExtended: ServiceRunExtended[] = services.map(serviceRun => {
      return {
        ...serviceRun,
        status: serviceRun.status.filter(status => status !== ServiceRunStatus.Scheduled),
        statusString: serviceRun.status.filter(status => status !== ServiceRunStatus.Scheduled).toString(),
        comment: serviceRun.comment.slice(0, 60),
        userObject: this.userService.getUserById(serviceRun.userId)!,
        scheduled: serviceRun.status.includes(ServiceRunStatus.Scheduled),
        statusColor: serviceRun.status.includes(ServiceRunStatus.Completed)
          ? 'var(--color-cta)'
          : serviceRun.status.includes(ServiceRunStatus.Processing)
          ? 'var(--color-accent-6)'
          : serviceRun.status.includes(ServiceRunStatus['Processed with Errors'])
          ? 'var(--color-accent-2)'
          : '',
        durationString: DateTimeService.hoursToGreatesUnit(serviceRun.durationHours),
      };
    });
    return serviceRunExtended;
  }

  animateProcessingStatusBar() {
    let i = 16;
    setInterval(() => {
      this.processingStatusBarValue = Math.abs((i++ % 32) - 16);
      if (this.processingStatusBarValue === 0 || this.processingStatusBarValue === 16) {
        this.processingStatusBarDirection = !this.processingStatusBarDirection;
      }
    }, 100);
  }

  cancel(id: string) {
    alert('cancel item with id: ' + id);
  }

  details(id: string) {
    alert('details for item with id: ' + id);
  }

  onFilterClick(event: any) {
    console.log(event);
  }

  filterListBlur() {
    console.log('blur');
    this.showFilterPopupIndex = -1;
  }

  showFilterPopup(i: number) {
    if (this.showFilterPopupIndex === i) {
      this.showFilterPopupIndex = -1;
    } else {
      this.showFilterPopupIndex = i;
    }
  }

  previousType = '';
  toggleSort(type: string) {
    if (type === 'status' && this.previousType !== 'status') {
      this.previousType = 'status';
      return (this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (a.statusString > b.statusString ? 1 : -1)));
    } else if (type === 'status' && this.previousType === 'status') {
      this.previousType = '';
      return (this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (b.statusString > a.statusString ? 1 : -1)));
    } else if (type === 'date' && this.previousType !== 'date') {
      this.previousType = 'date';
      return (this.serviceRuns = this.serviceRuns
        .slice()
        .sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime()));
    } else if (type === 'date' && this.previousType === 'date') {
      this.previousType = '';
      return (this.serviceRuns = this.serviceRuns
        .slice()
        .sort((a, b) => a.submittedDate.getTime() - b.submittedDate.getTime()));
    } else if (type === 'duration' && this.previousType !== 'duration') {
      this.previousType = 'duration';
      return (this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (a.durationHours > b.durationHours ? 1 : -1)));
    } else if (type === 'duration' && this.previousType === 'duration') {
      this.previousType = '';
      return (this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (b.durationHours > a.durationHours ? 1 : -1)));
    }

    return this.serviceRuns;
  }
}
