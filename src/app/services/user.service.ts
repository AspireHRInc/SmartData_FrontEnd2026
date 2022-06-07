import { Injectable } from '@angular/core';
import userData from './user.data.json';
import { Service, Environments } from './services.service';
import { FilterGroup, Filter } from './service-run.service';

export class User {
  id = 0;
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  permission = '';
  userGroups: UserGroup[] = [];
  profilePic? = '';
  active = false;
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

export class Filters {
  status = [];
  'user groups': UserGroups[] = [];
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

  userFilters: FilterGroup[] = userData.userFilters;

  loggedInUserId = 10;
  loggedInUserObj = this.getUserById(this.loggedInUserId);

  currentUserGroups: UserGroups[] = [...this.userGroups];

  currentUsers: User[] = [...this.users];

  filtersActive = false;

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

  filterUsers(searchString: string, filters: Filters) {
    this.currentUsers = [...this.users];

    this.filtersActive = false;

    if (filters.status.length > 0 || filters['user groups'].length > 0) {
      this.filtersActive = true;
    }

    if (filters.status.length > 0) {
      this.currentUsers = [
        ...this.currentUsers.filter(user => {
          return filters.status.some((status: Filter) => {
            return user.active == (status.name === 'Active' ? true : false);
          });
        }),
      ];
    }

    if (filters['user groups'].length > 0) {
      this.currentUsers = [
        ...this.currentUsers.filter(user => {
          return filters['user groups'].some(group => {
            return user.userGroups.some(userGroup => userGroup.name === group.name);
          });
        }),
      ];
    }

    if (searchString !== '') {
      let searchStringArr: string[] = searchString.toLocaleLowerCase().split(' ');

      this.currentUsers = [
        ...this.currentUsers.filter(user => {
          // let tags = service.metaTags.map(tag => tag.name);
          return searchStringArr.every(
            searchWord =>
              searchStringArr.every(searchWord => user.firstName.toLocaleLowerCase().includes(searchWord)) ||
              searchStringArr.every(searchWord => user.lastName.toLocaleLowerCase().includes(searchWord))
          );
        }),
      ];
      return [...this.currentUsers];
    }

    if (searchString === '' && !this.filtersActive) {
      console.log('else');
      this.currentUsers = [...this.users];
      return this.currentUsers;
    }
    console.log(this.currentUsers);
    return this.currentUsers;
  }

  deactivateUser(userId: number) {
    // TODO: deactivate user
    let userIndex = this.users.findIndex(user => user.id === userId);
    this.users[userIndex].active = false;
  }

  activateUser(userId: number) {
    // TODO: activate user
    let userIndex = this.users.findIndex(user => user.id === userId);
    this.users[userIndex].active = true;
  }

  getUsers(): User[] {
    return this.currentUsers;
  }

  getUserGroupById(id: string) {
    return this.currentUserGroups.filter(group => group.id === id);
  }

  getUserGroupByName(name: string) {
    return this.currentUserGroups.filter(group => group.name === name);
  }

  addUser(user: User) {
    // TODO: add user
    console.log('Add User: ', user);
    // this.users.push(user);
  }

  editUser(user: User) {
    // TODO: edit user
    console.log('Edit User: ', user);
  }
}
