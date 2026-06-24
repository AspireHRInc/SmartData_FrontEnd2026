import { Component, OnInit, OnDestroy, ViewChild, HostListener, HostBinding, ElementRef, ViewChildren, QueryList, Renderer2, NgZone } from '@angular/core';
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
  lastUpdatedLocal = '';
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

  @HostBinding('class.standalone') get isStandalone() {
    return this.allServicesHistory;
  }

  @ViewChildren('anchor') public anchors!: QueryList<ElementRef>;
  @ViewChildren('popup', { read: ElementRef }) public popups!: QueryList<ElementRef>;

  allElements!: ElementRef<any>[];

  private popupObserver!: MutationObserver;

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

  filtersObj: any = {
    status: ['Completed', 'Processing', 'Processed with Errors', 'Cancelled'],
    dateRange: { start: new Date(0), end: new Date(0) },
    service: [],
    owner: []
  };

  searchString = '';
  filterActive = {};
  showCreateNewRun = false;
  serviceDetailsId = '';
  filterClearActive = false;

  allServicesHistory = false;

  serviceId = 'all';

  currentSortType = 'lastUpdated';
  currentSortDirection: 'asc' | 'desc' | '' = 'desc';

  private updatesSub!: Subscription;
  private refreshSub!: Subscription;

  constructor(
    public userService: UserService,
    public serviceRunService: ServiceRunService,
    public uiState: UiStateService,
    private route: ActivatedRoute,
    private router: Router,
    public localizationService: LocalizationService,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.serviceRunService.reset();
    this.serviceRunService.initialize();
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

    this.updatesSub = this.serviceRunService.serviceRunsUpdated$.pipe(
      take(1)
    ).subscribe(() => {
      this.loadDataFromService();
    });

    this.loadDataFromService();

    this.animateProcessingStatusBar();
    this.initPopupObserver();
  }

  ngOnDestroy(): void {
    if (this.updatesSub) {
      this.updatesSub.unsubscribe();
    }
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
    if (this.popupObserver) {
      this.popupObserver.disconnect();
    }
  }

  private initPopupObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      this.popupObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains('k-animation-container') ||
                  node.classList.contains('k-popup') ||
                  node.tagName.toLowerCase() === 'kendo-popup' ||
                  node.querySelector('.k-popup')) {
                setTimeout(() => this.styleFilterPopup(), 0);
              }
            }
          });
        });
      });

      this.popupObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  private styleFilterPopup(): void {
    const kendoPopupElements = document.querySelectorAll('kendo-popup.k-animation-container, kendo-popup.filter-popup');
    kendoPopupElements.forEach(kp => {
      const el = kp as HTMLElement;
      el.style.setProperty('border', 'none', 'important');
      el.style.setProperty('outline', 'none', 'important');
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('background', 'transparent', 'important');
      el.style.setProperty('background-color', 'transparent', 'important');
    });

    const popups = document.querySelectorAll('.k-popup');
    popups.forEach(popup => {
      const el = popup as HTMLElement;
      el.style.setProperty('background', 'var(--m3-surface)', 'important');
      el.style.setProperty('border', 'none', 'important');
      el.style.setProperty('border-radius', '8px', 'important');
      el.style.setProperty('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.15)', 'important');
      el.style.setProperty('outline', 'none', 'important');
      el.style.setProperty('padding', '1rem', 'important');
      el.style.setProperty('overflow', 'visible', 'important');
      el.style.setProperty('color', 'white', 'important');

      el.querySelectorAll('.content, .filter-list, .filter-item, ul, li, div').forEach(child => {
        const childEl = child as HTMLElement;
        childEl.style.setProperty('background', 'transparent', 'important');
        childEl.style.setProperty('background-color', 'transparent', 'important');
        childEl.style.setProperty('border', 'none', 'important');
        childEl.style.setProperty('outline', 'none', 'important');
        childEl.style.setProperty('box-shadow', 'none', 'important');
      });

      el.querySelectorAll('input[type="checkbox"], .k-checkbox').forEach(cb => {
        const cbEl = cb as HTMLElement;
        cbEl.style.setProperty('width', '16px', 'important');
        cbEl.style.setProperty('height', '16px', 'important');
        cbEl.style.setProperty('min-width', '16px', 'important');
        cbEl.style.setProperty('min-height', '16px', 'important');
        cbEl.style.setProperty('border-radius', '3px', 'important');
        cbEl.style.setProperty('box-shadow', 'none', 'important');
        cbEl.style.setProperty('outline', 'none', 'important');
        cbEl.style.setProperty('appearance', 'none', 'important');
        cbEl.style.setProperty('-webkit-appearance', 'none', 'important');
        if ((cbEl as HTMLInputElement).checked || cbEl.classList.contains('k-checked')) {
          cbEl.style.setProperty('background', 'white', 'important');
          cbEl.style.setProperty('border', '2px solid white', 'important');
        } else {
          cbEl.style.setProperty('background', 'rgba(255, 255, 255, 0.2)', 'important');
          cbEl.style.setProperty('border', '2px solid white', 'important');
        }
      });
    });
  }

  refreshHistory(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }

    this.refreshSub = this.serviceRunService.serviceRunsUpdated$.pipe(
      take(1)
    ).subscribe(() => {
      this.loadDataFromService();
      this.onServiceFilter();
      this.reapplySort();
    });

    this.serviceRunService.refresh();
  }

  private reapplySort(): void {
    if (this.currentSortType && this.currentSortDirection) {
      this.applySort(this.currentSortType, this.currentSortDirection);
    }
  }

  private applySort(type: string, direction: 'asc' | 'desc'): void {
    switch (type) {
      case 'taskName':
        if (direction === 'asc') {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (a.taskName || a.serviceName || '').localeCompare(b.taskName || b.serviceName || ''));
        } else {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (b.taskName || b.serviceName || '').localeCompare(a.taskName || a.serviceName || ''));
        }
        break;
      case 'status':
        if (direction === 'asc') {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (a.statusString > b.statusString ? 1 : -1));
        } else {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (b.statusString > a.statusString ? 1 : -1));
        }
        break;
      case 'owner':
        if (direction === 'asc') {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (a.owner || '').localeCompare(b.owner || ''));
        } else {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => (b.owner || '').localeCompare(a.owner || ''));
        }
        break;
      case 'lastUpdated':
        if (direction === 'asc') {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
        } else {
          this.serviceRuns = this.serviceRuns.slice().sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        }
        break;
    }
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

    // Apply default sort (lastUpdated desc) on every data load
    this.reapplySort();

    this.filters = this.filters.map(filterGroup => {
      if (filterGroup.name === 'Status') {
        return {
          ...filterGroup,
          filters: ['Completed', 'Processing', 'Processed with Errors', 'Cancelled'],
        };
      }
      if (filterGroup.name === 'Date Range') {
        return filterGroup;
      }
      if (filterGroup.name === 'Owner') {
        const ownerFilters = filterGroup.filters!.map((filter: any) => filter.name || filter);
        if (ownerFilters.length === 0) {
          return {
            ...filterGroup,
            filters: [],
            emptyMessage: 'No users available for this date'
          };
        }
        return {
          ...filterGroup,
          filters: ownerFilters,
        };
      }
      return {
        ...filterGroup,
        filters: filterGroup.filters!.map((filter: any) => {
          return filter.name || filter;
        }),
      };
    });
  }

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
      { status: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [], owner: [] }
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
      this.selectedDateRangeFilter = { start: new Date(), end: new Date() };
      this.filtersObj.dateRange = { start: new Date(0), end: new Date(0) };
      this.showFilterPopupIndex = -1;

      if (this.refreshSub) {
        this.refreshSub.unsubscribe();
      }
      this.refreshSub = this.serviceRunService.serviceRunsUpdated$.pipe(
        take(1)
      ).subscribe(() => {
        this.loadDataFromService();
        this.onServiceFilter();
        this.reapplySort();
      });

      this.serviceRunService.clearDateFilter();
    } else if (range && range.start && range.end) {
      this.selectedDateRangeFilter = range;
      this.filtersObj.dateRange = range;
      this.showFilterPopupIndex = -1;

      if (this.refreshSub) {
        this.refreshSub.unsubscribe();
      }
      this.refreshSub = this.serviceRunService.serviceRunsUpdated$.pipe(
        take(1)
      ).subscribe(() => {
        this.loadDataFromService();
        this.onServiceFilter();
        this.reapplySort();
      });

      this.serviceRunService.refreshWithDateRange(range.start, range.end);
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
      this.reapplySort();
    }
  }

  onServiceFilter(event: any = '') {
    this.serviceRuns = this.getExtendedServices(
      this.serviceRunService.filterServiceRuns(this.searchString, this.getEffectiveFiltersObj())
    );
    this.reapplySort();
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
      case ServiceRunStatus.Cancelled:
        return 'Cancelled';
      default:
        return '';
    }
  }

  formatLocalDate(date: Date): string {
    if (!date || isNaN(date.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${month} ${day}, ${year}, ${displayHours}:${minutes}:${seconds} ${ampm}`;
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
          : filteredStatus.includes(ServiceRunStatus.Cancelled)
          ? 'var(--color-text-secondary)'
          : '',
        durationString: DateTimeService.hoursToGreatesUnit(serviceRun.durationHours),
        lastUpdatedLocal: this.formatLocalDate(serviceRun.lastUpdated),
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

  toggleSort(type: string) {
    if (this.currentSortType === type) {
      if (this.currentSortDirection === 'asc') {
        this.currentSortDirection = 'desc';
      } else {
        this.currentSortType = '';
        this.currentSortDirection = '';
        this.onServiceFilter();
        return this.serviceRuns;
      }
    } else {
      this.currentSortType = type;
      this.currentSortDirection = 'asc';
    }

    this.applySort(this.currentSortType, this.currentSortDirection);
    return this.serviceRuns;
  }

  clearAllFilters() {
    this.showFilterPopupIndex = -1;
    this.filtersObj = {
      status: ['Completed', 'Processing', 'Processed with Errors', 'Cancelled'],
      dateRange: { start: new Date(0), end: new Date(0) },
      service: [],
      owner: []
    };
    this.selectedDateRangeFilter = { start: new Date(), end: new Date() };
    this.serviceRunService.filtersActive = false;

    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
    this.refreshSub = this.serviceRunService.serviceRunsUpdated$.pipe(
      take(1)
    ).subscribe(() => {
      this.loadDataFromService();
      this.onServiceFilter();
      this.reapplySort();
    });

    const today = new Date();
    this.serviceRunService.refreshWithDateRange(today, today);
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

