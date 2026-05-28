import { Component, Input, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { UiStateService } from '../../services/ui-state.service';
import { ServiceRunService, ServiceRun, ServiceRunStatus } from 'src/app/services/service-run.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ss-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(calc(100% + 40px))' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateX(calc(100% + 40px))' }))]),
    ]),
  ],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() opened = false;
  @Output() selectedFilters = new EventEmitter<string[]>();

  filters: FormGroup = this.fb.group({});

  private resize$ = new Subscription();
  private serviceRunsSubscription: Subscription | null = null;

  width = 480;
  height = 750;
  top = 0;
  left = 0;

  dragged = false;

  // Recently used processes (last 5)
  recentlyUsed: ServiceRun[] = [];

  // Quick stats
  totalRunsToday = 0;
  successRate = 0;
  averageDuration = 0;
  failedRuns = 0;

  constructor(private fb: FormBuilder, public uiState: UiStateService, private serviceRunService: ServiceRunService) {}

  ngOnInit(): void {
  this.setWindowDimensions();

  // Initialize service runs if not already loaded
  this.serviceRunService.initialize();

  // Subscribe to service runs updates
  this.serviceRunsSubscription = this.serviceRunService.serviceRunsUpdated$.subscribe(() => {
    this.updateStats();
  });

  // Initial load (after a small delay to ensure data is loaded)
  setTimeout(() => this.updateStats(), 500);
}


  ngOnDestroy(): void {
    if (this.serviceRunsSubscription) {
      this.serviceRunsSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(e: Event) {
    this.setWindowDimensions();
  }

  setWindowDimensions() {
    this.top = window.innerHeight / 2 - this.height / 2;
    if (this.top < 0) this.top = 0;
    this.left = window.innerWidth - this.width - 25;
    if (this.left < 0) this.left = 0;
  }

  private updateStats(): void {
    const runs = this.serviceRunService.serviceRuns;

    // Recently used (last 5)
    this.recentlyUsed = runs.slice(0, 5);

    // Calculate stats for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysRuns = runs.filter(r => {
      const runDate = new Date(r.submittedDate);
      runDate.setHours(0, 0, 0, 0);
      return runDate.getTime() === today.getTime();
    });

    this.totalRunsToday = todaysRuns.length;

    // Success rate
    const completedRuns = todaysRuns.filter(r => r.status.includes(ServiceRunStatus.Completed)).length;
    this.successRate = this.totalRunsToday > 0 ? Math.round((completedRuns / this.totalRunsToday) * 100) : 0;

    // Failed runs
    this.failedRuns = todaysRuns.filter(r => r.status.includes(ServiceRunStatus.Error)).length;

    // Average duration
    const totalDuration = todaysRuns.reduce((sum, r) => sum + r.durationHours, 0);
    this.averageDuration = this.totalRunsToday > 0 ? totalDuration / this.totalRunsToday : 0;
  }

  close() {
    this.uiState.hideServiceFilters();
  }

  // Quick access to recently used process
  quickAccess(run: ServiceRun) {
    console.log('Quick access to:', run.serviceName);
    // TODO: Navigate to the process or trigger execution
    this.uiState.hideServiceFilters();
  }

  trackByRunId(index: number, run: ServiceRun): string {
    return run.id;
  }
}
