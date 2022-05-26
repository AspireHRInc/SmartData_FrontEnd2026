import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { UserService, User, UserGroups } from 'src/app/services/user.service';
import { ServicesService, Service, Environment, Environments } from 'src/app/services/services.service';
import { UiStateService } from '../../services/ui-state.service';

export class UserGroupsExtended extends UserGroups {
  users: User[] = [];
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

    // trigger('detailsDrawerAnimation', [
    //   transition(':enter', [
    //     style({ transform: 'scaleY(0)' }),
    //     animate('500ms ease-out', style({ transform: 'scaleY(1)' })),
    //   ]),
    //   transition(':leave', [
    //     style({ transform: 'scaleY(1)' }),
    //     animate('500ms ease-in', style({ transform: 'scaleY(0)' })),
    //   ]),
    // ]),
  ],
})
export class AdminComponent implements OnInit {
  loggedInUserObj = new User();
  userGroups: UserGroups[] = [];
  userGroupsExtended: UserGroupsExtended[] = [];
  detailsOpen = 0;

  services: Service[] = [];
  environments: Environment[] = [];

  userGroupsForm: FormGroup = this.fb.group({});

  userGroupsFormInitialValues: any;

  constructor(
    private userService: UserService,
    public servicesService: ServicesService,
    private fb: FormBuilder,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.loggedInUserObj = this.userService.loggedInUserObj!;

    this.loadUserGroups();

    this.services = this.servicesService.allServices[0].services;
    this.environments = this.servicesService.evironments;

    this.generateFormModel();
  }

  loadUserGroups() {
    this.userGroups = this.userService.userGroups;
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

      this.services.forEach(service => {
        (this.userGroupsForm.get(userGroup.name) as FormGroup)!.addControl(
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

    console.log('removeUserGroup');
    console.log(id);
    this.userService.removeUserGroup(id);
    this.loadUserGroups();
  }

  removeUser(event: Event, userGroupName: string, userId: number) {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;

    this.userService.removeUserFromGroup(userGroupName, userId);
    this.loadUserGroups();
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
}
