import { Component, OnInit, HostBinding, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs';

import { Title } from '@angular/platform-browser';
import { UiStateService } from './services/ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'smart-suite';
  @HostBinding('class.show-menu') showMenu = false;

  constructor(
    public uiState: UiStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.uiState.menuOpen$.subscribe(state => (this.showMenu = state));

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

    // this.uiState.errorNotification$.subscribe(errorMessage => {
    //   this.showError(errorMessage);
    // });
  }

  // public showError(notificationText: string): void {
  //   this.notificationService.show({
  //     content: notificationText,
  //     // hideAfter: 3000,
  //     hideAfter: 50000,
  //     position: { horizontal: 'center', vertical: 'bottom' },
  //     animation: { type: 'fade', duration: 400 },
  //     type: { style: 'error', icon: true },
  //   });
  // }

  showErrorUI() {
    this.uiState.setErrorNotification('new error ' + String(new Date()));
  }
}
