import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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
  loggedInUserObj = new User();

  serviceRuns: ServiceRunExtended[] = [];

  searchField = '';
  searchFieldUpdate = new Subject<string>();

  processingStatusBarValue = 0;
  processingStatusBarDirection = true;

  statusBadgeColor = AccentColor.gray;

  filters: any[] = [];

  constructor(public userService: UserService, public serviceRunService: ServiceRunService) {}

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
  }

  onServiceSearch(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      // this.services = this.servicesService.onServiceSearch(this.searchField);
    }
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
}
