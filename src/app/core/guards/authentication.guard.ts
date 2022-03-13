import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticationService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanLoad {
  constructor(
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authenticationService.isLoggedIn()) {
      return true;
    }
    this._router.navigate(['signin']);
    return false;
  }
}
