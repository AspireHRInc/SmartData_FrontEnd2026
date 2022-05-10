import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService, ServiceRun, ServiceRunStatus } from 'src/app/services/service-run.service';
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

  cancelServiceId = '';

  // filtersFormGroup = this.fb.group({
  //   Status: this.fb.group({}),
  // });

  selectedDateRangeFilter = { start: new Date(), end: new Date() };

  filtersObj: any = { status: [], requester: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] };

  searchString = '';

  filterActive = {};

  showCreateNewRun = false;

  serviceDetailsId = '';

  constructor(
    public userService: UserService,
    public serviceRunService: ServiceRunService,
    public uiState: UiStateService
  ) {}

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

    // this.filters.forEach(filterCategory => {
    //   this.filtersFormGroup.addControl(filterCategory.name, this.fb.group({}));

    //   filterCategory.filters.forEach((filter: any) => {
    //     (this.filtersFormGroup.get(filterCategory.name) as FormGroup).addControl(filter, new FormControl(false));
    //   });
    // });

    this.searchFieldUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.serviceRuns = this.getExtendedServices(
        this.serviceRunService.filterServiceRuns(this.searchString, this.filtersObj)
      );
    });
  }

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
    this.showFilterPopupIndex = -1;
    this.onServiceFilter();
  }

  filterChecked(filterGroupFilters: any, filter: any) {
    console.log('filterChecked');
    return filterGroupFilters.includes(filter);
  }

  onDateRangeValueChange(range?: SelectionRange, action?: string) {
    if (action === 'clear') {
      this.filtersObj.dateRange = { start: new Date(0), end: new Date(0) };
      this.onServiceFilter();
    } else {
      this.filtersObj.dateRange = range;
      this.onServiceFilter();
    }
  }

  onSearchStringUpdate(event: any) {
    this.searchString = event.target.value;
    if (event.key === 'Enter' || event.type === 'click') {
      this.serviceRuns = this.getExtendedServices(
        this.serviceRunService.filterServiceRuns(this.searchString, this.filtersObj)
      );
    }
  }

  onServiceFilter(event: any = '') {
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
    this.cancelServiceId = id;
    this.uiState.showCancelServiceRun();
  }

  details(id: string) {
    this.serviceDetailsId = id;
    this.uiState.showServiceRunResults();
  }

  info(id: string) {
    this.serviceDetailsId = id;
    this.uiState.showServiceRunInfo();
  }

  filterListBlur() {
    console.log('blur');
    this.showFilterPopupIndex = -1;
  }

  // @ViewChildren('anchor') public anchor!: ElementRef;
  // @ViewChildren('popup', { read: ElementRef }) public popup!: ElementRef;

  // @HostListener('document:click', ['$event'])
  // public documentClick(event: KeyboardEvent): void {
  //   console.log(this.anchor);
  //   console.log(this.popup);
  //   console.log(event.target);
  //   if (!this.contains(event.target!)) {
  //     // this.toggle(false);
  //     this.showFilterPopupIndex = -1;
  //   }

  //   if () {

  //   }
  // }

  // contains(target: EventTarget): boolean {
  //   return (
  //     this.anchor.nativeElement.contains(target) || (this.popup ? this.popup.nativeElement.contains(target) : false)
  //   );
  // }

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

  clearAllFilters() {
    this.showFilterPopupIndex = -1;
    this.filtersObj = { status: [], requester: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] };
    this.onServiceFilter();
  }
}
