import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // NOTE: this is development logic only and should be replaced, we're defaulting
  // to an authenticated state when in a development environ, otherwise default to false.

  isAuthenticated = new BehaviorSubject<boolean>(!environment.production);

  constructor() {}

  authenticate(username: String, password: String): boolean {
    if (username.toLowerCase() === 'a@aspire.com' && password.toLowerCase() === 'pillango') {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }

    return this.isAuthenticated.value;
  }
}
