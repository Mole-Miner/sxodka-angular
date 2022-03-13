import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordEqualityValidator } from '@core/forms';
import { AuthenticationService } from '@core/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, OnDestroy {
  private readonly _unsubscribe: Subject<void> = new Subject<void>();

  form!: FormGroup;

  hidePassword = true;

  constructor(
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService
  ) {}

  get nameFormControl(): AbstractControl {
    return this.form.get('name')!;
  }

  get lastnameFormControl(): AbstractControl {
    return this.form.get('lastname')!;
  }

  get emailFormControl(): AbstractControl {
    return this.form.get('email')!;
  }

  get passwordFormControl(): AbstractControl {
    return this.form.get('password')!;
  }

  get passwordConfirmationFormControl(): AbstractControl {
    return this.form.get('passwordConfirmation')!;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(undefined, [Validators.required]),
      lastname: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
      passwordConfirmation: new FormControl(undefined, [Validators.required, passwordEqualityValidator]),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      // this._authenticationService.signup(this.form.getRawValue())
      //   .pipe(takeUntil(this._unsubscribe))
      //   .subscribe()
      console.log(this.form.getRawValue());
    }
  }

  navigateToSignin(): void {
    this._router.navigate(['signin']);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
