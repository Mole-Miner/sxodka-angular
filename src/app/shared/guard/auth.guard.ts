import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['signin']);
    return false;
  }
}
