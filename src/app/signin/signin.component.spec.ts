import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Location } from '@angular/common';

import { AuthService } from '../shared/service/auth.service'; 
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from './signin.component';
import { routes } from '../app-routing.module';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SigninComponent,
        SignupComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to signup component', fakeAsync(() => {
    component.navigateToSignup();
    tick();
    expect(location.path()).toBe('/signup');
  }));
});
