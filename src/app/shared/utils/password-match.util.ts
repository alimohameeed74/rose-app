import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(formControlOne: string, formControlTwo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(formControlOne)?.value;
    const confirmPassword = control.get(formControlTwo)?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
