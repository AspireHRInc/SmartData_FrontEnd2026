import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next, error);
        }
        return throwError(() => error);
      })
    );
  }

  //if a request is rejected, refresh the tokens and let the service handle the retry
  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) { //prevents duplicate refreshes
      this.isRefreshing = true;
      this.refreshDone$.next(false);

      this.authService.refreshSession().subscribe({ //fresh tokens received, reset the flags so the 401 can be triggered again
        next: () => {
          this.isRefreshing = false;
          this.refreshDone$.next(true);
        },
        error: () => { //refresh token is expired, show "session expired"
          this.isRefreshing = false;
          this.refreshDone$.next(true);
          this.authService.showSessionExpired();
        },
      });
    }

    // Propagate the original error so the service's own retry logic can handle it
    // (e.g., loadProcessTypes retries after 2s and will get the fresh token)
    return throwError(() => originalError);
  }
}