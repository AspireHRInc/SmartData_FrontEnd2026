import { Injectable } from '@angular/core';
import userData from './user.data.json';
import { Service, Environments } from './services.service';

export class User {
  id = 0;
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  permission = '';
  userGroups: UserGroup[] = [];
  profilePic? = '';
  constructor() {}
}

export class UserGroups {
  id = '';
  name = '';
  services: string[] = [];
  environments: Environments[] = [];
  CanSeeProcessesByOthers = false;
  constructor() {}
}

export class UserGroup {
  id = '';
  name = '';
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = userData.users;
  userGroups: UserGroups[] = userData.userGroups.map(userGroup => {
    return {
      ...userGroup,
      environments: userGroup.environments as Environments[],
    };
  });

  loggedInUserId = 10;
  loggedInUserObj = this.getUserById(this.loggedInUserId);

  constructor() {}

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  getUsersByIds(ids: number[]) {
    let usersFiltered: User[] = [];
    ids.forEach(id => {
      let userFound: User = this.users.find(user => user.id === id)!;
      usersFiltered.push(userFound);
    });
    return usersFiltered;
  }

  getUserFirstNameById(id: number) {
    return this.users.find(user => user.id === id)?.firstName;
  }

  getUserLastNameById(id: number) {
    return this.users.find(user => user.id === id)?.lastName;
  }

  getUserFullNameById(id: number) {
    return this.users.find(user => user.id === id)?.firstName + ' ' + this.users.find(user => user.id === id)?.lastName;
  }

  getProfilePicNameById(id: number) {
    return this.users.find(user => user.id === id)?.profilePic;
  }

  updateUserDetails(userDetails: any) {
    let currentUserIndex = userData.users.findIndex(user => user.id === userDetails.id);
    userData.users[currentUserIndex].firstName = userDetails.firstName;
    userData.users[currentUserIndex].lastName = userDetails.lastName;
    userData.users[currentUserIndex].email = userDetails.email;
    userData.users[currentUserIndex].phone = userDetails.phone;
    userData.users[currentUserIndex].permission = userDetails.permission;
    userData.users[currentUserIndex].userGroups = userDetails.userGroups.split(',');
  }

  getUserGroupUsers(userGroupId: string): User[] {
    return this.users.filter(user => user.userGroups.some(group => group.id == userGroupId));
  }

  updateUserGroupPermissions(userGroupName: string, permissions: any) {
    // TODO: update user group permissions on server
    console.log(userGroupName);
    console.log(permissions);
  }

  removeUserGroup(userGroupId: string) {
    // TODO: remove user group from server
    let groupIndex = this.userGroups.findIndex(group => group.id === userGroupId);
    this.userGroups.splice(groupIndex, 1);
    console.log(this.userGroups);
  }

  removeUserFromGroup(userGroupName: string, userId: number) {
    // TODO: remove user from group on server
    let userIndex = this.users.findIndex(user => {
      return user.id === userId;
    });

    let groupIndex = this.users[userIndex].userGroups.findIndex(group => {
      return group.name === userGroupName;
    });

    this.users[userIndex].userGroups.splice(groupIndex, 1);
  }

  addUserToGroup(userGroupName: string, userId: number) {
    // TODO: add user to group on server
    let userIndex = this.users.findIndex(user => {
      return user.id === userId;
    });

    let additionalUserGroupIndex = this.userGroups.findIndex(group => group.name === userGroupName);

    this.users[userIndex].userGroups.push(this.userGroups[additionalUserGroupIndex]);
  }

  currentUserGroups: UserGroups[] = [...this.userGroups];

  filterUserGroups(searchString: string) {
    if (searchString !== '') {
      let searchStringArr: string[] = searchString.toLocaleLowerCase().split(' ');

      this.currentUserGroups = [
        ...this.currentUserGroups.filter(run => {
          // let tags = service.metaTags.map(tag => tag.name);
          return searchStringArr.every(searchWord => run.name.toLocaleLowerCase().includes(searchWord));
        }),
      ];
      return [...this.currentUserGroups];
    }

    if (searchString === '') {
      console.log('else');
      this.currentUserGroups = [...this.userGroups];
      return this.currentUserGroups;
    }

    return this.currentUserGroups;
  }
}
