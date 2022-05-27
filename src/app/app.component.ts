import { Component, OnInit, HostBinding } from '@angular/core';
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
    private titleService: Title
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
  }
}
