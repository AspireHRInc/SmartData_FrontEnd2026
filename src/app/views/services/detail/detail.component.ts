import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';
import { ServicesService, ServiceCategory, Tag } from 'src/app/services/services.service';

@Component({
  selector: 'ss-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  loggedInUserObj = new User();
  showCreateNewRun = true;
  currentServiceId = '';
  currentServiceName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;
    // console.log(this.route.snapshot.params['id']);
    this.currentServiceId = this.route.snapshot.params['id'];

    this.currentServiceName = this.servicesService.allServices[0].services.find(
      service => service.id === this.currentServiceId.toString()
    )!.name;
  }

  onNavigateHistory() {
    // this.router.navigate(['/services', this.data.id, 'detail', 'history']);
    this.router.navigate(['history'], { relativeTo: this.route });
  }
}
