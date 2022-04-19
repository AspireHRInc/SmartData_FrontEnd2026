import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  loggedInUserObj = new User();
  constructor(public userService: UserService, public servicesService: ServicesService) {}

  filters = ['All', 'Filters', 'Favorites'];
  activeFilter = '';

  searchSource: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
  searchData: string[] = [];

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;
    console.log(this.loggedInUserObj);
    this.searchData = this.searchSource.slice();
  }

  selectedFilter(filter: string): void {
    this.activeFilter = filter;
  }

  handleFilter(value: string) {
    this.searchData = this.searchSource.filter(s => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
