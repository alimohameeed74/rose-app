import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToggleThemeComponent } from '../../../../shared/components/toggle-theme/toggle-theme.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { passwordMatch } from '../../../../shared/utils/password-match.util.js';
import { ErrMessComponent } from '../../../../shared/components/err-mess/err-mess.component';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

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

  emailLoading: WritableSignal<boolean> = signal(false);
  step: WritableSignal<number> = signal(1);
  passwordLoading: WritableSignal<boolean> = signal(false);
  hidePassword: WritableSignal<boolean> = signal(true);
  hidePassword_: WritableSignal<boolean> = signal(true);

  // Email Form
  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  // Password Form
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

  constructor() {}

  ngOnInit() {
    this.resetAll();
  }

  get emailController() {
    return this.emailForm.get('email')!;
  }

  get passwordController() {
    return this.passwordsForm.get('password_')!;
  }

  get confirmPasswordController() {
    return this.passwordsForm.get('confirmPassword')!;
  }

  sendEmail() {
    this.increaseStep();
  }
  submitPassword() {}

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
