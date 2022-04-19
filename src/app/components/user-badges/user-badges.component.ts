import { Component, Input } from '@angular/core';
import { User } from 'src/app/services/user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ss-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.less'],
  host: { class: 'user-badges' },
})
export class UserBadgesComponent {
  @Input() users: User[] = [];

  @Input() size: string = '';
  @Input() stacked: boolean = true;
  @Input() truncateAt: number = 0;

  constructor(public userService: UserService) {}
}
