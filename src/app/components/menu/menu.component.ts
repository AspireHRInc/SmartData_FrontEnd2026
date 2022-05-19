import { Component, HostListener, OnInit } from '@angular/core';
// import { User } from 'src/app/models/user.model';
// import { ApplicationService } from '../services/application.service';
// import { UserService } from '../services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  @HostListener('click') onNavigation() {
    // close the menu
    // this.uiState.toggleMenu();
  }

  public navigationItems: any;

  constructor(
    private uiState: UiStateService,
    private userService: UserService // private appService: ApplicationService, public userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedInUserObj!.customRoles!.includes('Admin')) {
      this.navigationItems = [
        { title: 'Home', url: 'services/dashboard', icon: 'home' },
        { title: 'Job Search', url: 'services/dashboard', icon: 'search' },
        { title: 'Profile', url: 'user-profile', icon: 'person' },
        // { title: 'Admin', icon: 'settings' },
        { title: 'Logout', url: 'logout', icon: 'logout' },
      ];
    } else {
      this.navigationItems = [
        { title: 'Home', url: 'services/dashboard', icon: 'home' },
        { title: 'Job Search', url: 'services/dashboard', icon: 'search' },
        { title: 'Profile', url: 'user-profile', icon: 'person' },
        { title: 'Logout', url: 'logout', icon: 'logout' },
      ];
    }
  }
}
