import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UiStateService } from './services/ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'smart-suite';

  constructor(public uiState: UiStateService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
