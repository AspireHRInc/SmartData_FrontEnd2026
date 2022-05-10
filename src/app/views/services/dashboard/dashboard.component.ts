import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { UserService, User } from 'src/app/services/user.service';
import { ServicesService, ServiceCategory, Tag } from 'src/app/services/services.service';
import { UiStateService } from 'src/app/services/ui-state.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  loggedInUserObj = new User();
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
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;

    this.services = [...this.servicesService.getServices()];

    this.searchFieldUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.services = this.servicesService.onServiceSearch(value);
    });
  }

  selectedFilter(filter: string): void {
    console.log('selectedFilter ', filter);
    this.searchField = '';
    console.log(this.servicesService.currentFilter);

    if (filter !== 'filters') {
      if (this.servicesService.currentFilter !== filter) {
        this.servicesService.currentFilter = filter;
      } else {
        this.servicesService.currentFilter = '';
      }
    }

    console.log('this.servicesService.currentFilter ', this.servicesService.currentFilter);

    if (filter !== 'filters') {
      this.uiState.hideServiceFilters();
      this.services = [...this.servicesService.getServices()];
    } else {
      this.uiState.showServiceFilters();
    }
  }

  requestService(serviceId: string) {
    console.log('request service ' + serviceId);
  }

  onCatgoryViewAll(categoryId: string) {
    this.services.find(service => service.id === categoryId)!.defaultMaxTiles = 0;
  }

  onToggleFavorite(serviceId: string, metaTags: Tag[]) {
    this.servicesService.toggleFavorite(serviceId, metaTags);
  }

  openInfo(categoryId: string, serviceId: string) {
    // TODO: connect to UiStatService and detail modal
    this.uiState.setIdServiceDetailId(categoryId + '-' + serviceId);
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
}
