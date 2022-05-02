import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  form!: FormGroup;

  hidePassword = true;

  constructor(
    private readonly router: Router
  ) { }

  get emailFormControl(): AbstractControl {
    return this.form.get('email')!;
  }

  get passwordFormControl(): AbstractControl {
    return this.form.get('password')!;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [Validators.required, Validators.minLength(8)])
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      // this._authenticationService.signin(this.form.getRawValue())
      //   .pipe(takeUntil(this._unsubscribe))
      //   .subscribe(() => this._router.navigate(['']))
      console.log('signin', this.form.getRawValue());
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['signup']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
