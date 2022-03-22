import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/env';
import { JwtTokens, Signin, Signup } from '@core/models';
import { of } from 'rxjs';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private readonly _http: HttpClient) {}

  signin(value: Signin): Observable<JwtTokens> {
    return this._http.post<JwtTokens>(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.signin}`, value).pipe(
      tap(response => this.storeTokens(response)),
      catchError(e => of(e.error))
    );
  }

  signup(value: Signup): Observable<JwtTokens> {
    return this._http.post<JwtTokens>(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.signup}`, value).pipe(
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

  refresh(): Observable<JwtTokens> {
    return this._http.get<JwtTokens>(`${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.refresh}`).pipe(
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

  private storeTokens(value: JwtTokens): void {
    localStorage.setItem(this.ACCESS_TOKEN, value.access);
    localStorage.setItem(this.REFRESH_TOKEN, value.refresh);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
