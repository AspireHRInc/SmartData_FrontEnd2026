import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_mKiQ8hBvH',
  ClientId: '6a8hfo7867d9jki0rgb7rs4lkg'
};

const userPool = new CognitoUserPool(poolData);

export type AuthResult = 'SUCCESS' | 'FAILURE' | 'NEW_PASSWORD_REQUIRED';

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
  private pendingUser: CognitoUser | null = null;
  messages: string = '';

  constructor() {
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
  }

  authenticate(username: string, password: string): Observable<AuthResult> {
    return new Observable<AuthResult>((observer) => {
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
          this.storeSession(result);
          this.messages = '';
          observer.next('SUCCESS');
          observer.complete();
        },
        onFailure: (err: any) => {
          this.messages = err.message || 'Authentication failed';
          this.isAuthenticated.next(false);
          observer.next('FAILURE');
          observer.complete();
        },
        newPasswordRequired: (userAttributes: any) => {
          // First sign-in with a temporary password: Cognito requires the user
          // to set a permanent one. Stash the user so the component can complete it.
          delete userAttributes.email_verified;
          delete userAttributes.email;
          this.pendingUser = cognitoUser;
          this.messages = '';
          observer.next('NEW_PASSWORD_REQUIRED');
          observer.complete();
        },
      });
    });
  }

  completeNewPassword(newPassword: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!this.pendingUser) {
        this.messages = 'Session expired — please sign in again.';
        observer.next(false);
        observer.complete();
        return;
      }
      this.pendingUser.completeNewPasswordChallenge(
        newPassword,
        {},
        {
          onSuccess: (result: any) => {
            this.storeSession(result);
            this.messages = '';
            this.pendingUser = null;
            observer.next(true);
            observer.complete();
          },
          onFailure: (err: any) => {
            this.messages = err.message || 'Could not set new password';
            observer.next(false);
            observer.complete();
          },
        }
      );
    });
  }

  private storeSession(result: any): void {
    this.idToken = result.getIdToken().getJwtToken();
    this.accessToken = result.getAccessToken().getJwtToken();
    this.refreshToken = result.getRefreshToken().getToken();
    this.isAuthenticated.next(true);
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
    this.idToken = '';
    this.accessToken = '';
    this.refreshToken = '';
    this.isAuthenticated.next(false);
  }

  clearMassages() {
    this.messages = '';
  }
}

