import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoRefreshToken,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

const poolData = {
  UserPoolId: 'us-east-1_mKiQ8hBvH',
  ClientId: '6a8hfo7867d9jki0rgb7rs4lkg',
};

const userPool = new CognitoUserPool(poolData);

//aydyadhsaud
//refresh buffer, refreshes 5 minutes before access token expires (in milliseconds)
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

//inactivity timer, set to kick user out after 30 minutes of inactivity (in milliseconds)
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

//defined "user activity"
const ACTIVITY_EVENTS: string[] = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isAuthenticated = new BehaviorSubject<boolean>(!environment.production);
  sessionExpired$ = new BehaviorSubject<boolean>(false);
  private sessionExpiredShown = false;
  private idToken: string = '';
  private accessToken: string = '';
  private refreshToken: string = '';
  private refreshTimerId: any = null;
  private inactivityTimerId: any = null;
  private activityListenersBound = false;
  messages: string = '';

  constructor(private router: Router, private ngZone: NgZone) {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: CognitoUserSession | null) => {
        if (err || !session) {
          return;
        }

        if (session.isValid()) {
          this.setTokensFromSession(session);
          this.isAuthenticated.next(true);
          this.scheduleTokenRefresh(session);
          this.startInactivityTimer();
        } else {
          //check if the refresh token is still active (takes precedent over access token)
          this.refreshToken = session.getRefreshToken().getToken();
          this.attemptTokenRefresh(currentUser);
        }
      });
    }

    // Listen for token changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key?.includes('CognitoIdentityServiceProvider')) {
        const lastAuthKey = `CognitoIdentityServiceProvider.${poolData.ClientId}.LastAuthUser`;
        const currentLastUser = localStorage.getItem(lastAuthKey);
        const ourToken = this.getIdToken();

        if (ourToken) {
          const parts = ourToken.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(
              atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
            );
            const ourUsername =
              payload['email'] || payload['cognito:username'] || '';

            if (currentLastUser && currentLastUser !== ourUsername) {
              this.logout();
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.clearRefreshTimer();
    this.stopInactivityTimer();
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const lastAuthKey = `CognitoIdentityServiceProvider.${poolData.ClientId}.LastAuthUser`;
      const lastUser = localStorage.getItem(lastAuthKey);
      if (lastUser && lastUser !== username) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.includes(lastUser)) {
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
        onSuccess: (result: CognitoUserSession) => {
          this.setTokensFromSession(result);
          this.isAuthenticated.next(true);
          this.sessionExpiredShown = false;
          this.sessionExpired$.next(false);
          this.messages = '';

          // Start both timers
          this.scheduleTokenRefresh(result);
          this.startInactivityTimer();

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
    this.clearRefreshTimer();
    this.stopInactivityTimer();

    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes('CognitoIdentityServiceProvider')) {
        localStorage.removeItem(key);
      }
    });

    this.idToken = '';
    this.accessToken = '';
    this.refreshToken = '';
    this.isAuthenticated.next(false);

    this.router.navigateByUrl('/login');
  }

  clearMassages() {
    this.messages = '';
  }

  //refreshes the session, gets fresh refresh tokens, schedules the next refresh, and inform the caller
  refreshSession(): Observable<string> {
    return new Observable<string>((observer) => {
      const currentUser = userPool.getCurrentUser(); //current user

      //if there's no user or refresh token, send error to interceptor
      if (!currentUser || !this.refreshToken) {
        observer.error('No user or refresh token available');
        return;
      }

      const token = new CognitoRefreshToken({ RefreshToken: this.refreshToken });

      //API call to COgnito
      currentUser.refreshSession(token, (err: any, session: CognitoUserSession | null) => {
        if (err || !session) { //check if refresh token valid
          observer.error(err || 'Refresh failed');
          return;
        }

        //store all tokens, confirm user authentication, and schedule next refresh (in 55 minutes)
        this.setTokensFromSession(session);
        this.isAuthenticated.next(true);
        this.scheduleTokenRefresh(session);

        observer.next(this.idToken);
        observer.complete();
      });
    });
  }

  //gets all three tokens: idToken, accessToken, and refreshToken
  private setTokensFromSession(session: CognitoUserSession): void {
    this.idToken = session.getIdToken().getJwtToken();
    this.accessToken = session.getAccessToken().getJwtToken();
    this.refreshToken = session.getRefreshToken().getToken();
  }

  //schedules the next refresh in 55 minutes
  private scheduleTokenRefresh(session: CognitoUserSession): void {
    this.clearRefreshTimer();

    const expiresAt = session.getAccessToken().getExpiration() * 1000; // ms
    const now = Date.now();
    const delay = Math.max(expiresAt - now - REFRESH_BUFFER_MS, 0);

    this.refreshTimerId = setTimeout(() => {
      this.silentRefresh();
    }, delay);
  }

  //get the new access and id tokens
  private silentRefresh(): void {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser || !this.refreshToken) {
      this.showSessionExpired();
      return;
    }

    this.attemptTokenRefresh(currentUser);
  }

  //API call to cognito, same one as the block in refreshSession()
  private attemptTokenRefresh(cognitoUser: CognitoUser): void {
    const token = new CognitoRefreshToken({ RefreshToken: this.refreshToken });

    cognitoUser.refreshSession(token, (err: any, session: CognitoUserSession | null) => {
      if (err || !session) {
        console.warn('Token refresh failed:', err?.message || 'No session returned');
        this.showSessionExpired();
        return;
      }

      this.setTokensFromSession(session);
      this.isAuthenticated.next(true);
      //start the timers
      this.scheduleTokenRefresh(session);
      this.startInactivityTimer();
    });
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimerId !== null) {
      clearTimeout(this.refreshTimerId);
      this.refreshTimerId = null;
    }
  }

  //inactivity timer logic
  private startInactivityTimer(): void {
    this.resetInactivityTimer();

    //listens for user activity outside of Angular (thus on the user machine)
    if (!this.activityListenersBound) {
      this.ngZone.runOutsideAngular(() => {
        ACTIVITY_EVENTS.forEach((event) => {
          window.addEventListener(event, this.onUserActivity);
        });
      });
      this.activityListenersBound = true;
    }
  }

  //stops the inactivity timer and stop tracking any user activity (user assumed to be away)
  private stopInactivityTimer(): void {
    if (this.inactivityTimerId !== null) { //stop timer
      clearTimeout(this.inactivityTimerId);
      this.inactivityTimerId = null;
    }

    if (this.activityListenersBound) { //stop tracking predefined activities
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, this.onUserActivity);
      });
      this.activityListenersBound = false;
    }
  }

  //if user is present we reset the inactivity timer here
  private resetInactivityTimer(): void {
    if (this.inactivityTimerId !== null) {
      clearTimeout(this.inactivityTimerId);
    }

    this.inactivityTimerId = setTimeout(() => {
      this.onInactivityTimeout();
    }, INACTIVITY_TIMEOUT_MS);
  }

  //this method is called everytime the user does a predefined activity, calls the reset timer method
  private onUserActivity = (): void => {
    this.resetInactivityTimer();
  };

  //this method is called if the user has been inactive for 30 minutes, kick out logic and display message
  private onInactivityTimeout(): void {
    this.ngZone.run(() => {
      this.showSessionExpired();
      this.logout();
    });
  }
}
