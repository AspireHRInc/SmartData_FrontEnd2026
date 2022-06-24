import { Component, Input, HostBinding, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/services/user.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'ss-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.less'],
  host: { class: 'user-badge' },
})
export class UserBadgeComponent implements OnInit {
  // @Input() user: User = new User();
  badgeUser: User = new User();
  @HostBinding('class.double-border') @Input() doubleBorder: boolean = false;
  @HostBinding('style.outline-color') outlineColor = '';

  @Input() size: string = '40px';
  @HostBinding('style.height') height = this.size;
  @HostBinding('style.width') width = this.size;

  @Input() fontSize: string = '';

  // private _userObj: User = new User;
  @Input() set user(user: User) {
    if (user !== null) {
      this.badgeUser = user;
      this.fullName = (user.firstName ?? '') + (user.lastName ?? '');
      this.outlineColor = this.calculateBGColor(this.fullName);
      this.bgColor = this.calculateBGColor(this.fullName);
    }
  }

  bgColor: string = '';
  fullName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.height = this.size;
    this.width = this.size;
  }

  calculateBGColor(fullName: string): string {
    return ColorService.StringToHslColor(fullName);
  }
}
