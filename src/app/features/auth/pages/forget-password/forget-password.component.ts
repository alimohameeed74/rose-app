import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToggleThemeComponent } from '../../../../shared/components/toggle-theme/toggle-theme.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { passwordMatch } from '../../../../shared/utils/password-match.util.js';
import { ErrMessComponent } from '../../../../shared/components/err-mess/err-mess.component';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyEmail } from '../../models/response/verify-email.js';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  imports: [
    ToggleThemeComponent,
    ReactiveFormsModule,
    ErrMessComponent,
    ButtonDirective,
    InputText,
    RouterLink,
  ],
})
export class ForgetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  emailLoading: WritableSignal<boolean> = signal(false);
  step: WritableSignal<number> = signal(1);
  tokenParam: WritableSignal<string> = signal('');
  passwordLoading: WritableSignal<boolean> = signal(false);
  hidePassword: WritableSignal<boolean> = signal(true);
  hidePassword_: WritableSignal<boolean> = signal(true);

  // Email Form
  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    redirectUrl: ['http://localhost:4200/auth/forget-password'],
  });

  // Password Form
  passwordsForm = this.fb.nonNullable.group(
    {
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
      token: [''],
    },
    { validators: passwordMatch('newPassword', 'confirmPassword') },
  );

  constructor() {}

  ngOnInit() {
    this.resetAll();
    this.activatedRoute.queryParamMap.subscribe((param) => {
      const token = param.get('token');

      if (token) {
        this.tokenParam.set(token);
        this.passwordsForm.patchValue({
          token: this.tokenParam(),
        });
        this.step.set(3);
      }
    });
  }

  get emailController() {
    return this.emailForm.get('email')!;
  }

  get newPasswordController() {
    return this.passwordsForm.get('newPassword')!;
  }

  get confirmPasswordController() {
    return this.passwordsForm.get('confirmPassword')!;
  }

  sendEmail() {
    this.emailLoading.set(true);
    this.authService
      .forgetPassword(this.emailForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.emailLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully',
            detail: res.message,
          });
          this.increaseStep();
        },
        error: (err) => {
          this.emailLoading.set(false);
        },
      });
  }
  submitPassword() {
    this.passwordLoading.set(true);
    this.authService
      .resetPassword(this.passwordsForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.passwordLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully',
            detail: res.message,
          });
          this.resetAll();
          this.router.navigate(['/auth']);
        },
        error: (err) => {
          this.passwordLoading.set(false);
        },
      });
  }

  togglePassword() {
    this.hidePassword.update((v) => !v);
  }
  togglePassword_() {
    this.hidePassword_.update((v) => !v);
  }

  reserEmailForm() {
    this.emailForm.reset();
  }

  resetPasswordsForm() {
    this.passwordsForm.reset();
  }

  resetAll() {
    this.reserEmailForm();
    this.resetPasswordsForm();
  }

  increaseStep() {
    this.step.set(this.step() + 1);
  }

  decreaseStep() {
    this.step.set(this.step() - 1);
  }
}
