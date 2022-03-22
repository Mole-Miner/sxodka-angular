import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/env';
import { of } from 'rxjs';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private readonly _http: HttpClient) {}

  signin(signinDto: any): Observable<any> {
    return this._http.post(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.signin}`, signinDto).pipe(
      tap(response => this.storeTokens(response)),
      catchError(e => of(e.error))
    );
  }

  signup(signupDto: any): Observable<any> {
    return this._http.post(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.signup}`, signupDto).pipe(
      tap(response => this.storeTokens(response)),
      catchError(e => of(e.error))
    );
  }

  logout(): Observable<void> {
    return this._http.get(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.logout}`).pipe(
      tap(() => this.removeTokens()),
      catchError(e => of(e.error))
    );
  }

  refresh(): Observable<any> {
    return this._http.get(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.refresh}`).pipe(
      tap(response => this.storeTokens(response)),
      catchError(e => of(e.error))
    )
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string  {
    return localStorage.getItem(this.ACCESS_TOKEN) ?? '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN) ?? '';
  }

  private storeTokens(tokens: any): void {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
