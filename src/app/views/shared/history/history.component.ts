import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService, ServiceRun, ServiceRunStatus } from 'src/app/services/service-run.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { AccentColor } from 'src/app/services/color.service';
import { LocalizationService } from 'src/app/services/localization.service';

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
    trigger('listItemInOutAnimation', [
      transition(':enter', [
        style({ transform: 'scaleY(.5)', opacity: 0.5 }),
        animate('300ms ease-out', style({ transform: 'scaleY(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scaleY(1)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'scaleY(.5)', opacity: 0.5 })),
      ]),
    ]),
  ],
})
export class HistoryComponent implements OnInit, OnDestroy {
  public toggleText = 'Show';
  public show = false;

  @ViewChildren('anchor') public anchors!: QueryList<ElementRef>;
  @ViewChildren('popup', { read: ElementRef }) public popups!: QueryList<ElementRef>;

  allElements!: ElementRef<any>[];

  @HostListener('document:click', ['$event'])
  public documentClick(event: KeyboardEvent): void {
    let filtersContainsEventTarget = false;

    this.allElements = this.anchors.toArray().concat(this.popups.toArray());

    this.allElements.forEach((element: any) => {
      if (element.nativeElement.contains(event.target)) {
        filtersContainsEventTarget = true;
      }
    });

    if (!filtersContainsEventTarget) {
      this.showFilterPopupIndex = -1;
    }
  }

  loggedInUserObj$: Observable<User> = this.userService.loggedInUserObj$;
  serviceRunsRaw: ServiceRun[] = [];
  serviceRuns: ServiceRunExtended[] = [];
  searchField = '';
  searchFieldUpdate = new Subject<string>();
  processingStatusBarValue = 0;
  processingStatusBarDirection = true;
  statusBadgeColor = AccentColor.gray;
  showFilterPopupIndex = -1;
  filters: any[] = [];
  cancelServiceId = '';

  selectedDateRangeFilter = { start: new Date(), end: new Date() };

  filtersObj: any = { status: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] };

  searchString = '';
  filterActive = {};
  showCreateNewRun = false;
  serviceDetailsId = '';
  filterClearActive = false;

  allServicesHistory = false;

  serviceId = 'all';

  private updatesSub!: Subscription;

  constructor(
    public userService: UserService,
    public serviceRunService: ServiceRunService,
    public uiState: UiStateService,
    private route: ActivatedRoute,
    private router: Router,
    public localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    if (this.router.url.indexOf('/services/history') > -1) {
      this.allServicesHistory = true;
      this.serviceId = 'all';
      this.serviceRunService.currentServiceRunsId = 'all';
      this.serviceRunService.currentServiceName = '';
    }

    this.route.parent!.params.subscribe(params => {
      if (params['id']) {
        this.serviceId = params['id'];
        this.serviceRunService.currentServiceRunsId = params['id'];
      }
    });

    this.serviceRunService.initialize();

    // Subscribe once to get initial data, then unsubscribe automatically
    this.updatesSub = this.serviceRunService.serviceRunsUpdated$.pipe(
      take(1)
    ).subscribe(() => {
      this.loadDataFromService();
    });

    this.loadDataFromService();

    this.animateProcessingStatusBar();
  }

  ngOnDestroy(): void {
    if (this.updatesSub) {
      this.updatesSub.unsubscribe();
    }
  }

  refreshHistory(): void {
    this.serviceRunService.initialize();
    this.loadDataFromService();
  }

  private loadDataFromService(): void {
    if (this.allServicesHistory === true) {
      this.serviceRunsRaw = this.serviceRunService.getServiceRuns();
      this.filters = this.serviceRunService.serviceRunsFilters
        .filter((filterGroup: any) => filterGroup.name !== 'Requester');
    } else {
      this.serviceRunsRaw = this.serviceRunService.getServiceRuns();
      this.filters = this.serviceRunService.singleServiceRunsFilters
        .filter((filterGroup: any) => filterGroup.name !== 'Service' && filterGroup.name !== 'Requester');
    }

    this.serviceRuns = this.getExtendedServices(this.serviceRunsRaw);

    this.filters = this.filters.map(filterGroup => {
      if (filterGroup.name === 'Status') {
        return {
          ...filterGroup,
          filters: ['Completed', 'Processing', 'Processed with Errors'],
        };
      }
      return {
        ...filterGroup,
        filters: filterGroup.filters!.map((filter: any) => {
          return filter.name;
        }),
      };
    });
  }

  /**
   * Maps the UI filter values to include the underlying data values.
   * "Processing" in the UI should also match "Missing" in the data.
   * "Processed with Errors" in the UI should also match "Error" in the data.
   */
  private getEffectiveFiltersObj(): any {
    const effectiveFilters = { ...this.filtersObj };

    if (effectiveFilters.status && effectiveFilters.status.length > 0) {
      const expandedStatus = [...effectiveFilters.status];
      if (expandedStatus.includes('Processing') && !expandedStatus.includes('Missing')) {
        expandedStatus.push('Missing');
      }
      if (expandedStatus.includes('Processed with Errors') && !expandedStatus.includes('Error')) {
        expandedStatus.push('Error');
      }
      effectiveFilters.status = expandedStatus;
    }

    return effectiveFilters;
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

    if (
      this.filtersObj ===
      { status: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] }
    ) {
      this.filterClearActive = false;
    } else {
      this.filterClearActive = true;
    }

    this.showFilterPopupIndex = -1;
    this.onServiceFilter();
  }

  isEmptyObject(o: any) {
    return Object.keys(o).every(function (x) {
      return o[x].length === 0 || o[x] === new Date(0);
    });
  }

  filterChecked(filterGroupFilters: any, filter: any) {
    return filterGroupFilters.includes(filter);
  }

  onDateRangeValueChange(range?: SelectionRange, action?: string) {
    if (action === 'clear') {
      this.selectedDateRangeFilter = { start: new Date(0), end: new Date(0) };
      this.filtersObj.dateRange = { start: new Date(0), end: new Date(0) };
      this.onServiceFilter();
    } else {
      this.selectedDateRangeFilter = range!;
      this.filtersObj.dateRange = range;
      this.onServiceFilter();
    }
  }

  onSearchStringUpdate(event: any) {
    if (event.target && event.target.value !== undefined) {
      this.searchString = event.target.value;
    }
    if (event.key === 'Enter' || event.type === 'click') {
      this.searchString = this.searchField;
      this.serviceRuns = this.getExtendedServices(
        this.serviceRunService.filterServiceRuns(this.searchString, this.getEffectiveFiltersObj())
      );
    }
  }

  onServiceFilter(event: any = '') {
    this.serviceRuns = this.getExtendedServices(
      this.serviceRunService.filterServiceRuns(this.searchString, this.getEffectiveFiltersObj())
    );
  }

  private getStatusDisplayString(status: ServiceRunStatus): string {
    switch (status) {
      case ServiceRunStatus.Processing:
        return 'Processing';
      case ServiceRunStatus.Completed:
        return 'Completed';
      case ServiceRunStatus.Error:
        return 'Processed with Errors';
      case ServiceRunStatus['Processed with Errors']:
        return 'Processed with Errors';
      case ServiceRunStatus.Missing:
        return 'Processing';
      default:
        return '';
    }
  }

  getExtendedServices(services: ServiceRun[]): ServiceRunExtended[] {
    let serviceRunExtended: ServiceRunExtended[] = services.map(serviceRun => {
      const displayStatus = serviceRun.status.map(s =>
        s === ServiceRunStatus.Missing ? ServiceRunStatus.Processing : s
      );

      const filteredStatus = displayStatus.filter(
        (status: ServiceRunStatus) => status !== ServiceRunStatus.Scheduled
      );

      const statusString = filteredStatus
        .map(s => this.getStatusDisplayString(s))
        .join(',');

      return {
        ...serviceRun,
        status: filteredStatus,
        statusString: statusString,
        comment: serviceRun.comment.slice(0, 60),
        userObject: this.userService.getUserById(serviceRun.userId) || new User(),
        scheduled: serviceRun.status.includes(ServiceRunStatus.Scheduled),
        statusColor: filteredStatus.includes(ServiceRunStatus.Completed)
          ? 'var(--color-cta)'
          : filteredStatus.includes(ServiceRunStatus.Processing)
          ? 'var(--color-accent-6)'
          : filteredStatus.includes(ServiceRunStatus['Processed with Errors'])
          ? 'var(--color-accent-2)'
          : filteredStatus.includes(ServiceRunStatus.Error)
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
    }, 200);
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
    this.filtersObj = { status: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] };
    this.selectedDateRangeFilter = { start: new Date(), end: new Date() };
    this.serviceRunService.filtersActive = false;
    this.onServiceFilter();
  }

  onSetupRun() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['setup'], { relativeTo: this.route.parent });
  }

  onNavigateHistory() {
    this.router.navigate(['history'], { relativeTo: this.route });
  }

  trackByRunId(index: number, item: ServiceRunExtended): string {
    return item.id + item.statusString;
  }
}

