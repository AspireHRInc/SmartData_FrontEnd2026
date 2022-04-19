import { Injectable } from '@angular/core';
import userData from './user.data.json';

export class User {
  id = 0;
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  permission = '';
  roles?: string[] = [];
  profilePic? = '';
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = userData.users;

  loggedInUserId = 10;
  loggedInUserObj = this.getUserById(this.loggedInUserId);

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
    userData.users[currentUserIndex].roles = userDetails.roles.split(',');
  }

  constructor() {}
}
