
import { Component, HostListener, OnInit } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { UserService, User } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  @HostListener('click') onNavigation() {
    this.uiState.closeMenu();
  }

  loggedInUserObj = new User();

  public navigationItems: any;

  constructor(
    private uiState: UiStateService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Default nav until user data loads
    this.navigationItems = [
      { title: 'Home', url: '/services/dashboard', icon: 'home' },
    ];

    // Only subscribe to user data after authentication
    this.authService.isAuthenticated.subscribe(isAuth => {
      if (isAuth && this.userService.loggedInUserObj$) {
        this.userService.loggedInUserObj$.subscribe(user => {
          this.loggedInUserObj = user;
          this.buildNavigation();
        });
      }
    });
  }

  private buildNavigation(): void {
    if (this.loggedInUserObj?.userGroups?.filter(userGroup => userGroup.name === 'Admin').length > 0) {
      this.navigationItems = [
        { title: 'Home', url: '/services/dashboard', icon: 'home' },
        { title: 'Job Search', url: '/services/dashboard', icon: 'search' },
        { title: 'Profile', url: 'user-profile', icon: 'person' },
        { title: 'Logout', url: 'logout', icon: 'logout' },
      ];
    } else {
      this.navigationItems = [
        { title: 'Home', url: '/services/dashboard', icon: 'home' },
        { title: 'Job Search', url: '/services/dashboard', icon: 'search' },
        { title: 'Admin', url: '/admin', icon: 'settings' },
        { title: 'Profile', url: 'user-profile', icon: 'person' },
        { title: 'Logout', url: 'logout', icon: 'logout' },
      ];
    }
  }
}

