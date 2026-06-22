import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

const poolData = {
  UserPoolId: 'us-east-1_mKiQ8hBvH',
  ClientId: '6a8hfo7867d9jki0rgb7rs4lkg'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(!environment.production);
  sessionExpired$ = new BehaviorSubject<boolean>(false);
  private sessionExpiredShown = false;
  private idToken: string = '';
  private accessToken: string = '';
  private refreshToken: string = '';
  messages: string = '';

  constructor(private router: Router) {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (session && session.isValid()) {
          this.idToken = session.getIdToken().getJwtToken();
          this.accessToken = session.getAccessToken().getJwtToken();
          this.refreshToken = session.getRefreshToken().getToken();
          this.isAuthenticated.next(true);
        }
      });
    }

    //listen for token changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key?.includes('CognitoIdentityServiceProvider')) {
        const lastAuthKey = `CognitoIdentityServiceProvider.${poolData.ClientId}.LastAuthUser`;
        const currentLastUser = localStorage.getItem(lastAuthKey);
        const ourToken = this.getIdToken();

        if(ourToken) {
          const parts = ourToken.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            const ourUsername = payload['email'] || payload['cognito:username'] || '';
            
            if (currentLastUser && currentLastUser !== ourUsername) {
              //another user logged in so kick us out
              this.logout();
            }
          }
        }
      }
    });
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      //check localStorage for existing valid session before attempting authentication
      const lastAuthKey = `CognitoIdentityServiceProvider.${poolData.ClientId}.LastAuthUser`;
      const lastUser = localStorage.getItem(lastAuthKey);
      if (lastUser && lastUser !== username) {
        //clear tokens for previous user
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if(key.includes(lastUser)){
            localStorage.removeItem(key);
          }
        });
      }

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result: any) => {
          this.idToken = result.getIdToken().getJwtToken();
          this.accessToken = result.getAccessToken().getJwtToken();
          this.refreshToken = result.getRefreshToken().getToken();
          this.isAuthenticated.next(true);
          this.messages = '';
          observer.next(true);
          observer.complete();
        },
        onFailure: (err: any) => {
          this.messages = err.message || 'Authentication failed';
          this.isAuthenticated.next(false);
          observer.next(false);
          observer.complete();
        },
        newPasswordRequired: (userAttributes) => {
          this.messages = 'New password required';
          observer.next(false);
          observer.complete();
        },
      });
    });
  }

  getIdToken(): string {
    return this.idToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  showSessionExpired(): void {
    if (!this.sessionExpiredShown) {
      this.sessionExpiredShown = true;
      this.sessionExpired$.next(true);
    }
  }

  dismissSessionExpired(): void {
    this.sessionExpiredShown = false;
    this.sessionExpired$.next(false);
  }

  logout(): void {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }

    //clear all Cognito tokens from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if(key.includes('CognitoIdentityServiceProvider')) {
        localStorage.removeItem(key);
      }
    });

    //clear remaining tokens and update authentication state
    this.idToken = '';
    this.accessToken = '';
    this.refreshToken = '';
    this.isAuthenticated.next(false);

    this.router.navigateByUrl('/login');
  }

  clearMassages() {
    this.messages = '';
  }
}

