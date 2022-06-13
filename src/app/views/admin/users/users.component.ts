import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UserService, User, UserGroups } from 'src/app/services/user.service';
import { Filter, FilterGroup } from 'src/app/services/service-run.service';
import { UiStateService } from 'src/app/services/ui-state.service';

import { UserExtended } from '../admin.component';

@Component({
  selector: 'ss-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  animations: [
    trigger('listItemInOutAnimation', [
      transition(':enter', [
        style({ transform: 'scaleY(.5)', opacity: 0.5 }),
        animate('300ms ease-out', style({ transform: 'scaleY(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scaleY(1)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'scaleY(.5)', opacity: 0.5 })),
      ]),
    ]),
    trigger('detailsDrawerAnimation', [
      transition(':enter', [style({ maxHeight: '0px' }), animate('500ms ease-out', style({ maxHeight: '2000px' }))]),
      transition(':leave', [style({ maxHeight: '2000px' }), animate('500ms ease-in', style({ maxHeight: '0px' }))]),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  loggedInUserObj = new User();

  users: User[] = [];
  usersExtended: UserExtended[] = [];

  searchFieldUpdate = new Subject<string>();
  searchField = '';

  filters: FilterGroup[] = [];
  showFilterPopupIndex = -1;

  filtersObj: any = { status: [], 'user groups': [] };
  filterClearActive = false;

  userDetailModalTitle = '';
  currentUserDetail = new User();

  constructor(public userService: UserService, public uiState: UiStateService) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;
    this.users = this.userService.users;

    this.usersExtended = this.userService.users;

    this.searchFieldUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.usersExtended = this.userService.filterUsers(this.searchField, this.filtersObj);
      // this.loadUserGroups();
    });

    this.filters = this.userService.userFilters;
  }

  loadUserGroups() {
    // this.users = this.userService.currentUsers;
    // this.usersExtended = this.users;
  }

  removeUser(event: Event, userId: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    if (
      event.type === 'click' ||
      (event.type === 'keyup' &&
        ((event as KeyboardEvent).code === 'Space' || (event as KeyboardEvent).code === 'Enter'))
    ) {
      this.userService.deactivateUser(userId);
      // this.loadUserGroups();
    }
  }

  reAddUser(event: Event, userId: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    this.userService.activateUser(userId);
    // this.loadUserGroups();
  }

  togglePendingRemoval(userIndex: number, userId: string) {
    // let toggleUserIndex = this.usersExtended[userIndex].findIndex(user => user.id === userId);

    this.usersExtended[userIndex].pendingRemoval = !this.usersExtended[userIndex].pendingRemoval;
  }

  onUsersSearch(event: Event) {}

  onServiceFilter(event: any = '') {
    this.usersExtended = this.userService.filterUsers(this.searchField, this.filtersObj);
  }

  getExtendedUsers(services: User[]): UserExtended[] {
    this.users = this.userService.users;

    this.usersExtended = this.userService.users;
    return this.usersExtended;
  }

  onCheckboxChange(filterGroup: string, filter: Filter | string) {
    if (!this.filtersObj[filterGroup.toLocaleLowerCase()].includes(filter)) {
      this.filtersObj[filterGroup.toLocaleLowerCase()].push(filter);
    } else {
      this.filtersObj[filterGroup.toLocaleLowerCase()] = this.filtersObj[filterGroup.toLocaleLowerCase()].filter(
        (value: string) => {
          return value !== filter;
        }
      );
    }

    if (
      this.filtersObj ===
      { status: [], requester: [], dateRange: { start: new Date(0), end: new Date(0) }, service: [] }
    ) {
      this.filterClearActive = false;
    } else {
      this.filterClearActive = true;
    }

    this.showFilterPopupIndex = -1;
    this.onServiceFilter();
  }

  showFilterPopup(i: number) {
    if (this.showFilterPopupIndex === i) {
      this.showFilterPopupIndex = -1;
    } else {
      this.showFilterPopupIndex = i;
    }
  }

  clearAllFilters() {
    this.showFilterPopupIndex = -1;
    this.filtersObj = { status: [], 'user groups': [] };

    this.userService.filtersActive = false;
    this.onServiceFilter();
  }

  editUser(event: Event, userId: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    if (
      event.type === 'click' ||
      (event.type === 'keyup' && (event as KeyboardEvent).code === 'Enter') ||
      (event as KeyboardEvent).code === 'Space'
    ) {
      this.userDetailModalTitle = this.userService.getUserFullNameById(userId);
      this.currentUserDetail = this.userService.getUserById(userId)!;
      this.uiState.showUserDetail();
    }
  }

  addUser() {
    this.userDetailModalTitle = 'Add User';
    this.currentUserDetail = new User();
    this.uiState.showUserDetail();
  }

  onAddUser(user: User) {
    this.userService.addUser(user);
  }
  onEditUser(user: User) {
    this.userService.editUser(user);
  }
}
