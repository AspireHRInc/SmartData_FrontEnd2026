import { Component, OnInit } from '@angular/core';
import { UserService, User, UserGroups } from 'src/app/services/user.service';

@Component({
  selector: 'ss-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  loggedInUserObj = new User();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;
  }
}
