import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { UserService, User, UserGroups } from 'src/app/services/user.service';
import { ServicesService, Service, Environment, Environments } from 'src/app/services/services.service';
import { UiStateService } from '../../services/ui-state.service';

import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { group } from 'console';

export class UserExtended extends User {
  pendingRemoval? = false;
}

export class UserGroupsExtended extends UserGroups {
  users: UserExtended[] = [];
}

@Component({
  selector: 'ss-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
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
export class AdminComponent implements OnInit {
  loggedInUserObj$: Observable<User> = this.userService.loggedInUserObj$;
  userGroups: UserGroups[] = [];
  userGroupsExtended: UserGroupsExtended[] = [];
  detailsOpen = -1;

  services: Service[] = [];
  environments: Environment[] = [];

  userGroupsForm: FormGroup = this.fb.group({});

  userGroupsFormInitialValues: any;

  expandedServiceIndex = -1;
  formDirtyIndex = -1;

  modelChanged: Subject<string> = new Subject<string>();
  searchFieldUpdate = new Subject<string>();

  searchField = '';

  currentUserGroupDeleteId = '';

  currentUserGroupToAddUser = '';

  constructor(
    private userService: UserService,
    public servicesService: ServicesService,
    private fb: FormBuilder,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.userGroups = this.userService.userGroups;
    this.loadUserGroups();

    this.services = this.servicesService.allServices[0].services;
    this.environments = this.servicesService.evironments;

    this.generateFormModel();

    this.searchFieldUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.detailsOpen = -1;
      this.userGroups = this.userService.filterUserGroups(value);
      this.loadUserGroups();
    });
  }

  loadUserGroups() {
    // this.userGroups = this.userService.userGroups;
    this.userGroupsExtended = this.userGroups.map(userGroup => {
      return { ...userGroup, users: this.userService.getUserGroupUsers(userGroup.id) };
    });
  }

  generateFormModel() {
    this.userGroupsExtended.forEach(userGroup => {
      this.userGroupsForm.addControl(userGroup.name, this.fb.group({}));

      (this.userGroupsForm.get(userGroup.name) as FormGroup)!.addControl(
        'Can See Others Processes',
        new FormControl(userGroup.CanSeeProcessesByOthers)
      );

      (this.userGroupsForm.get(userGroup.name) as FormGroup)!.addControl('services', this.fb.group({}));

      ((this.userGroupsForm.get(userGroup.name) as FormGroup).get('services') as FormGroup)!.addControl(
        'all',
        new FormControl()
      );

      this.services.forEach(service => {
        ((this.userGroupsForm.get(userGroup.name) as FormGroup).get('services') as FormGroup)!.addControl(
          service.name,
          new FormControl(userGroup.services.includes(service.name))
        );
      });

      this.environments.forEach(environment => {
        (this.userGroupsForm.get(userGroup.name) as FormGroup)!.addControl(
          environment.name,
          new FormControl(userGroup.environments.includes(environment.name as Environments))
        );
      });
    });
    this.userGroupsFormInitialValues = this.userGroupsForm.value;
  }

  onSetupUsers() {}

  cancelGroupPreferences() {
    this.userGroupsForm.reset(this.userGroupsFormInitialValues);
    this.detailsOpen = -1;
  }

  removeUserGroup(event: Event, id: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    this.currentUserGroupDeleteId = id;
    this.uiState.showConfirmUserGroupDelete();
  }

  onConfirmRemoveUserGroup() {
    if (this.currentUserGroupDeleteId !== '') {
      this.userService.removeUserGroup(this.currentUserGroupDeleteId);
    }
    this.loadUserGroups();
  }

  removeUser(event: Event, userGroupName: string, userId: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    this.userService.removeUserFromGroup(userGroupName, userId);
  }

  reAddUser(event: Event, userGroupName: string, userId: string) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    this.userService.addUserToGroup(userGroupName, userId);
  }

  togglePendingRemoval(userGroupindex: number, userId: string) {
    let userIndex = this.userGroupsExtended[userGroupindex].users.findIndex(user => user.id === userId);

    this.userGroupsExtended[userGroupindex].users[userIndex].pendingRemoval =
      !this.userGroupsExtended[userGroupindex].users[userIndex].pendingRemoval;
  }

  openDetail(index: number) {
    if (index !== this.detailsOpen) {
      this.detailsOpen = index;
    } else {
      this.detailsOpen = -1;
    }
  }

  openDetailWithKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.code === 'Space') {
      if (index !== this.detailsOpen) {
        this.detailsOpen = index;
      } else {
        this.detailsOpen = -1;
      }
    }
  }

  saveGroupPreferences(userGroupName: string) {
    this.userService.updateUserGroupPermissions(
      userGroupName,
      (this.userGroupsForm.get(userGroupName) as FormGroup)!.value
    );
  }

  expandService(index: number) {
    if (this.expandedServiceIndex === -1 || this.expandedServiceIndex !== index) {
      this.expandedServiceIndex = index;
    } else {
      this.expandedServiceIndex = -1;
    }
  }

  toggleAllServices(userGroupName: string) {
    let allChecked = ((this.userGroupsForm.get(userGroupName) as FormGroup).get('services') as FormGroup).get(
      'all'
    )!.value;

    if (!allChecked) {
      Object.keys(
        ((this.userGroupsForm.get(userGroupName) as FormGroup).get('services') as FormGroup).controls
      ).forEach(key => {
        ((this.userGroupsForm.get(userGroupName) as FormGroup).get('services') as FormGroup).get(key)?.setValue(true);
      });
      allChecked = true;
    } else {
      Object.keys(
        ((this.userGroupsForm.get(userGroupName) as FormGroup).get('services') as FormGroup).controls
      ).forEach(key => {
        ((this.userGroupsForm.get(userGroupName) as FormGroup).get('services') as FormGroup).get(key)?.setValue(false);
      });
      allChecked = true;
    }
  }

  onAddUserToGroup(groupName: string) {
    this.currentUserGroupToAddUser = groupName;
    console.log(this.currentUserGroupToAddUser);
    this.uiState.showUserDetail();
  }

  saveUserToGroup(user: User) {
    this.userService.onAddUserToGroup(user);
    this.loadUserGroups();

    this.uiState.hideUserDetail();
  }

  onGroupSearch(event: Event) {}
}
