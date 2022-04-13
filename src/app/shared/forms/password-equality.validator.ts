import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordEqualityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    const confirm = control.value;
    return password === confirm ? null : { doNotEqual: true };
}