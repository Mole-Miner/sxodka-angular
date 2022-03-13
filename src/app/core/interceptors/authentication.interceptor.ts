import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, of, switchMap, take, throwError } from 'rxjs';
import { AuthenticationService } from '@core/services';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.setAuthorizationHeader(request, this._authenticationService.getAccessToken())).pipe(
      catchError(e => {
        if (e instanceof HttpErrorResponse && e.status === 401 && !this.isRefreshing) {
          return this.on401Error(request, next);
        }
        return throwError(() => of(e));
      })
    );
  }

  private setAuthorizationHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
  }

  private on401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);
      return this._authenticationService.refresh().pipe(
        switchMap(response => {
          this.isRefreshing = false;
          this.refreshSubject.next(response.accessToken);
          return next.handle(this.setAuthorizationHeader(request, response.accessToken))
        })
      )
    }
    return this.refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(accessToken => (next.handle(this.setAuthorizationHeader(request, accessToken))))
    );
  }
}