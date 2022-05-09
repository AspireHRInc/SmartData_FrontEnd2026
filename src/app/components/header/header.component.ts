import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from 'src/app/services/user.service';

// export enum HeaderType {
//   'dashboard' = 'dashboard',
//   'serviceDetail' = 'serviceDetail',
// }

@Component({
  selector: 'ss-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() headerSubtitle = '';
  @Input() headerUserId = 1;
  @Input() headerUserObject = new User();
  @Input() type = 'dashboard';

  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
