import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatch } from '../../../../../shared/utils/password-match.util.js';
import { AccountService } from '../../services/account/account.service.js';
import { MessageService } from 'primeng/api';
import { ErrMessComponent } from '../../../../../shared/components/err-mess/err-mess.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [InputText, ButtonDirective, ReactiveFormsModule, ErrMessComponent],
})
export class ChangePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  isLoading: WritableSignal<boolean> = signal(false);
  hideOldPassword: WritableSignal<boolean> = signal(true);
  hideNewPassword: WritableSignal<boolean> = signal(true);
  hideConfirmPassword: WritableSignal<boolean> = signal(true);

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: passwordMatch('newPassword', 'confirmPassword'),
    },
  );
  constructor() {}

  ngOnInit() {}

  get currentPasswordController() {
    return this.passwordForm.get('currentPassword')!;
  }
  get newPasswordController() {
    return this.passwordForm.get('newPassword')!;
  }
  get confirmPasswordController() {
    return this.passwordForm.get('confirmPassword')!;
  }

  toggleOldPassword() {
    this.hideOldPassword.update((v) => !v);
  }
  toggleNewPassword() {
    this.hideNewPassword.update((v) => !v);
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword.update((v) => !v);
  }

  resetForm() {
    this.passwordForm.reset();
  }

  submit() {
    this.isLoading.set(true);
    this.accountService
      .changePassword(this.passwordForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Updated successfully.',
            detail: `${res.message}`,
          });
          this.resetForm();
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }
}
