import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password_')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}
