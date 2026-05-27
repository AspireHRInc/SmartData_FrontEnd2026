
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, User } from 'src/app/services/user.service';
import { ServicesService, ServiceCategory, Tag } from 'src/app/services/services.service';
import { UiStateService } from 'src/app/services/ui-state.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
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
export class DashboardComponent implements OnInit {
  isReady = false;
  loggedInUserObj$!: Observable<User>;
  services: ServiceCategory[] = [];
  allServices: ServiceCategory[] = [];

  filters = ['all', 'filters', 'favorites'];
  activeFilter = '';
  searchField = '';
  currentSearch: string[] = [];

  searchSource: Array<string> = [];
  searchData: string[] = [];

  modelChanged: Subject<string> = new Subject<string>();
  searchFieldUpdate = new Subject<string>();

  constructor(
    public userService: UserService,
    public servicesService: ServicesService,
    public uiState: UiStateService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.getIdToken()) {
      return;
    }

    // Test: fetch details for a known process
    this.servicesService.getProcessDetails('f3f2f39f-9a78-4d47-8e98-1f2b54319514')
      .subscribe(res => console.log('FULL RESPONSE:', res));

    this.isReady = true;
    this.loggedInUserObj$ = this.userService.loggedInUserObj$;

    this.servicesService.initialize();

    const interval = setInterval(() => {
      const data = this.servicesService.getServices();
      if (data.length > 0) {
        this.services = [...data];
        clearInterval(interval);
      }
    }, 500);

    this.searchFieldUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.services = this.servicesService.onServiceSearch(value);
    });
  }

  selectedFilter(filter: string): void {
    this.searchField = '';

    if (filter !== 'filters') {
      if (this.servicesService.currentFilter !== filter) {
        this.servicesService.currentFilter = filter;
      } else {
        this.servicesService.currentFilter = '';
      }
    }

    if (filter !== 'filters') {
      this.uiState.hideServiceFilters();
      this.services = [...this.servicesService.getServices()];
    } else {
      this.uiState.showServiceFilters();
    }
  }

  requestService(serviceId: string) {
    console.log(serviceId);
    this.uiState.setIdServiceDetailId(serviceId);
    this.uiState.showServiceDetail();
  }

  onCatgoryViewAll(categoryId: string) {
    this.services.find(service => service.id === categoryId)!.defaultMaxTiles = 0;
  }

  onToggleFavorite(serviceId: string, metaTags: Tag[]) {
    this.servicesService.toggleFavorite(serviceId, metaTags);
  }

  openInfo(serviceId: string) {
    this.uiState.setIdServiceDetailId(serviceId);
    this.uiState.showServiceDetail();
  }

  onServiceSearch(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.services = this.servicesService.onServiceSearch(this.searchField);
    }
  }

  onFiltersSelected(filtersArr: string[]) {
    this.servicesService.currentFilters = filtersArr;
    this.services = this.servicesService.onServiceSearch(this.searchField);
  }

  onServiceTileClick(event: Event, serviceId: string) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    console.log(serviceId);
  }

  onNavigateHistory() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['history'], { relativeTo: this.route.parent });
  }
}

