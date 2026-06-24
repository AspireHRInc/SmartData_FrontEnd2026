import { Component, OnInit, HostBinding, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs';

import { Title } from '@angular/platform-browser';
import { UiStateService } from './services/ui-state.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'smart-suite';
  @HostBinding('class.show-menu') showMenu = false;
  isAuthPage = false;

  constructor(
    public uiState: UiStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.uiState.menuOpen$.subscribe(state => (this.showMenu = state));

    // The app shell (nav rail + top bar) shows on every page except login.
    this.isAuthPage = this.router.url.startsWith('/login');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => (this.isAuthPage = this.router.url.startsWith('/login')));

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`${title} - Smart Suite`);
        }
      });
  }

  showErrorUI() {
    this.uiState.setErrorNotification(String(new Date()));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
