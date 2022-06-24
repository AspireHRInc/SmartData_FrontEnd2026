import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServicesService } from 'src/app/services/services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  loggedInUserObj$: Observable<User> = this.userService.loggedInUserObj$;
  showCreateNewRun = true;
  currentServiceId = '';
  currentServiceName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private servicesService: ServicesService,
    private _location: Location,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.currentServiceId = this.route.snapshot.params['id'];

    this.currentServiceName = this.servicesService.allServices[0].services.find(
      service => service.id === this.currentServiceId.toString()
    )!.name;
  }
}
