import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { LoginModel } from './login.model';
import { SignupModel } from './signup.model';

@Injectable()
export class AuthService {
    constructor(private readonly httpClient: HttpClient) { }

    login(loginModel: LoginModel): Observable<any> {
        return this.httpClient.post('', loginModel).pipe(
            catchError(() => of(null))
        );
    }

    signup(signupModel: SignupModel): Observable<any> {
        return this.httpClient.post('', signupModel).pipe(
            catchError(() => of(null))
        );
    }

    logout(): Observable<any> {
        return this.httpClient.post('', null).pipe(
            catchError(() => of(null))
        );
    }
}