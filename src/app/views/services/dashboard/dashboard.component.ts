import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { ServicesService, ServiceCategory } from 'src/app/services/services.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { HighlightSpanKind } from 'typescript';

@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  loggedInUserObj = new User();
  services: ServiceCategory[] = [];

  filters = ['All', 'Filters', 'Favorites'];
  activeFilter = '';

  searchSource: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
  searchData: string[] = [];

  constructor(
    public userService: UserService,
    public servicesService: ServicesService,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;
    this.services = this.servicesService.services;
    this.searchData = this.searchSource.slice();
  }

  selectedFilter(filter: string): void {
    this.activeFilter = filter;
  }

  handleFilter(value: string) {
    this.searchData = this.searchSource.filter(s => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  requestService(serviceId: string) {
    console.log('request service ' + serviceId);
  }

  onViewAll(categoryId: string) {
    console.log(categoryId);
    console.log(this.servicesService.services);
    this.services.find(service => service.id === categoryId)!.defaultMaxTiles = 0;
  }

  onFavorite(categoryId: string, serviceId: string, favorited: boolean) {
    this.servicesService.onUpdateFavoriteStatus(categoryId, serviceId, favorited);
  }

  openInfo(categoryId: string, serviceId: string) {
    // TODO: connect to UiStatService and detail modal
    this.uiState.setIdServiceDetailId(categoryId + '-' + serviceId);
    this.uiState.showServiceDetail();
  }
}
