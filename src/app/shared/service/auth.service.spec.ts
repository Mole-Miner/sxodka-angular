import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '@shared/env';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const signinStub = {
    email: 'test@mail.com',
    password: 'test123123'
  };

  const signupStub = {
    name: 'test',
    lastname: 'test',
    email: 'test@mail.com',
    password: 'test123123'
  };

  const jwtTokenStub = {
    access: 'test123123',
    refresh: 'test123123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send signin dto, get jwt access/refresh token, store tokens to local storage', () => {
    const url = `${environment.api.server}/${environment.api.auth.prefix}/${environment.api.auth.target.signin}`;
    const dto = {
      email: 'test@mail.com',
      password: 'test123123'
    };

    service.signin(dto).subscribe({
      next: res => {
        expect(req.request.method).toBe('POST');
        expect(res).toEqual(jwtTokenStub);
        expect(localStorage.getItem('ACCESS_TOKEN')).withContext('after signin check localstorage for access token').toBe(jwtTokenStub.access);
        expect(localStorage.getItem('REFRESH_TOKEN')).withContext('after signin check localstorage for refresh token').toBe(jwtTokenStub.refresh);
      }
    });

    const req = httpTestingController.expectOne({ url });
    req.flush(jwtTokenStub);
  });
});