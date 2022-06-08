import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UiStateService } from 'src/app/services/ui-state.service';
import { UserService, User, UserGroup } from 'src/app/services/user.service';

export class UserExtended extends User {
  fullName: string = '';
}

@Component({
  selector: 'ss-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less'],
})
export class UserDetailComponent implements OnInit {
  @Input() user: User = new User();
  @Input() title = '';
  @Input() group = '';
  // @Output() onSave = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() onSaveUserToGroup = new EventEmitter<User>();

  userForm = this.fb.group({
    id: [this.user.id],
    firstName: [this.user.firstName, Validators.required],
    lastName: [this.user.lastName, Validators.required],
    email: [this.user.email, Validators.email],
    userGroups: [],
  });

  currentUserGroups: UserGroup[] = [];

  currentUsersGroupIds: string[] = [];

  usersWithFullNameList: { fullName: string; id: string }[] = [];

  filteredUserToAdd: UserExtended[] = [];

  constructor(private uiState: UiStateService, public userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usersWithFullNameList = this.userService.users.map(user => {
      return { ...user, fullName: user.firstName + ' ' + user.lastName };
    });

    console.log(this.usersWithFullNameList);

    this.currentUsersGroupIds = this.user.userGroups.map(group => group.id);

    this.currentUserGroups = [...this.user.userGroups];

    this.userForm.setValue({
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      userGroups: this.currentUserGroups,
    });

    if (this.group !== '') {
      this.currentUserGroups = this.userService.getUserGroupByName(this.group);
      this.userForm.controls['userGroups'].setValue(this.currentUserGroups);
      console.log(this.currentUserGroups);
    }

    this.filteredUserToAdd = this.userService.users
      .filter(user => !user.userGroups.map(group => group.name).includes(this.group))
      .map(user => {
        return { ...user, fullName: user.firstName + ' ' + user.lastName };
      });
  }

  public close(): void {
    this.uiState.hideUserDetail();

    if (this.user.id !== '0') {
    }
  }

  save() {
    this.setCurrentUserToFormValues();
    if (this.user.id === '0') {
      this.addUser.emit(this.user);
    } else {
      this.editUser.emit(this.user);
    }
    this.uiState.hideUserDetail();
  }

  setCurrentUserToFormValues() {
    this.user.id = this.userForm.controls['id'].value;
    this.user.firstName = this.userForm.controls['firstName'].value;
    this.user.lastName = this.userForm.controls['lastName'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.userGroups = this.userForm.controls['userGroups'].value;
  }

  toggleUsersGroup(event: Event, groupId: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.currentUserGroups.push(this.userService.getUserGroupById(groupId).pop()!);
    } else {
      let groupIndex = this.currentUserGroups.indexOf(this.userService.getUserGroupById(groupId).pop()!);
      this.currentUserGroups.splice(groupIndex, 1);
    }

    console.log(this.currentUserGroups);
  }

  userValueChange(user: any) {
    this.userForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userGroups: this.currentUserGroups,
    });
  }

  saveUserToGroup() {
    this.setCurrentUserToFormValues();
    this.onSaveUserToGroup.emit(this.user);
  }
}
