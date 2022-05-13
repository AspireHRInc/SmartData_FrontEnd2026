import { Component, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpProgressEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';

/*
  Mocked backend service.
  For further details, check
  https://angular.io/guide/http#writing-an-interceptor
  !! Remove for production
*/

@Injectable({
  providedIn: 'root',
})
export class UploadInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<unknown>>[] = [0, 30, 60, 100].map(x =>
        of(<HttpProgressEvent>{
          type: HttpEventType.UploadProgress,
          loaded: x,
          total: 100,
        }).pipe(delay(500))
      );

      const success = of(new HttpResponse({ status: 100 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === 'removeUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
