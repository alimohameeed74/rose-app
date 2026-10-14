import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToggleThemeComponent } from '../../../../shared/components/toggle-theme/toggle-theme.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { Gender } from '../../enums/gender.enum.js';
import { InputText } from 'primeng/inputtext';
import { ErrMessComponent } from '../../../../shared/components/err-mess/err-mess.component';
import { ButtonDirective } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { InputOtp } from 'primeng/inputotp';
import { SelectModule, Select } from 'primeng/select';
import { passwordMatch } from '../../../../shared/utils/password-match.util.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { VerifyEmail } from '../../models/response/verify-email.js';
import { ApiResponse } from '../../../../core/models/api-response.js';
import { AuthResponse } from '../../models/response/auth-response.js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ToggleThemeComponent,
    ReactiveFormsModule,
    InputText,
    ErrMessComponent,
    ButtonDirective,
    RouterLink,
    InputOtp,
    Select,
  ],
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  readonly gender = Gender;
  readonly genders = [
    { label: 'Male', value: this.gender.MALE },
    { label: 'female', value: this.gender.FAMEALE },
  ];

  step: WritableSignal<number> = signal(1);
  emailLoading: WritableSignal<boolean> = signal(false);
  otpLoading: WritableSignal<boolean> = signal(false);
  passwordLoading: WritableSignal<boolean> = signal(false);
  hidePassword: WritableSignal<boolean> = signal(true);
  hidePassword_: WritableSignal<boolean> = signal(true);

  // Email Form
  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  // OTP Form
  otpForm = this.fb.nonNullable.group({
    email: [''],
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  // Info Form
  infoForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    gender: [this.gender.MALE],
  });

  // Passwords Form
  passwordsForm = this.fb.nonNullable.group(
    {
      password_: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatch },
  );

  // Register Form
  signupForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: [this.gender.MALE, [Validators.required]],
  });
  constructor() {}

  ngOnInit() {
    this.resetAll();
  }

  get emailController() {
    return this.emailForm.get('email')!;
  }

  get codeController() {
    return this.otpForm.get('code')!;
  }

  get firstNameController() {
    return this.infoForm.get('firstName')!;
  }

  get lastNameController() {
    return this.infoForm.get('lastName')!;
  }

  get usernameController() {
    return this.infoForm.get('username')!;
  }

  get phoneController() {
    return this.infoForm.get('phone')!;
  }

  get passwordController() {
    return this.passwordsForm.get('password_')!;
  }

  get confirmPasswordController() {
    return this.passwordsForm.get('confirmPassword')!;
  }

  sendEmail() {
    this.emailLoading.set(true);
    this.authService
      .sendEmailverification(this.emailForm.getRawValue())
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
  verifyOTP() {
    this.otpForm.patchValue({
      email: this.emailForm.controls.email.value,
    });
    this.otpLoading.set(true);
    this.authService
      .confirmEmailverification(this.otpForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.otpLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully',
            detail: res.message,
          });
          this.increaseStep();
        },
        error: (err) => {
          this.otpLoading.set(false);
        },
      });
  }

  submitInfo() {
    this.increaseStep();
  }
  submitPassword() {
    this.signupForm.setValue({
      email: this.emailForm.controls.email.value,
      firstName: this.infoForm.controls.firstName.value,
      lastName: this.infoForm.controls.lastName.value,
      username: this.infoForm.controls.username.value,
      gender: this.infoForm.controls.gender.value,
      password: this.passwordsForm.controls.password_.value,
      confirmPassword: this.passwordsForm.controls.confirmPassword.value,
    });

    const data = this.signupForm.getRawValue();
    this.passwordLoading.set(true);
    this.authService
      .signup(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ApiResponse<AuthResponse>) => {
          this.passwordLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Signedup successfully',
            detail: 'Please login with same username & password',
          });
          this.resetAll();
          this.router.navigate(['/auth/signin']);
        },
        error: (err) => {
          this.passwordLoading.set(false);
        },
      });
  }

  increaseStep() {
    this.step.set(this.step() + 1);
  }

  decreaseStep() {
    this.step.set(this.step() - 1);
  }

  reserEmailForm() {
    this.emailForm.reset();
  }

  resetOtpForm() {
    this.otpForm.reset();
  }

  reserInfoForm() {
    this.infoForm.reset();
  }

  resetPasswordsForm() {
    this.passwordsForm.reset();
  }

  togglePassword() {
    this.hidePassword.update((v) => !v);
  }
  togglePassword_() {
    this.hidePassword_.update((v) => !v);
  }

  resetAll() {
    this.reserEmailForm();
    this.resetOtpForm();
    this.reserInfoForm();
    this.resetPasswordsForm();
  }
}
