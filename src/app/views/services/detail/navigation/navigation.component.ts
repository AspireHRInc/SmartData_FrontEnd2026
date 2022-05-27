import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ss-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  onSetupRun() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['setup'], { relativeTo: this.route.parent });
  }

  onNavigateHistory() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['history'], { relativeTo: this.route.parent });
  }
}
