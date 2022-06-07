import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUserBadgeIds = ['1', '2', '3'];
  numberOfHappyCustomers = 7291;
  userRating = 4.8;

  constructor() {}
}
