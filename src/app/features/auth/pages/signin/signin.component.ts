import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { ToggleThemeComponent } from '../../../../shared/components/toggle-theme/toggle-theme.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrMessComponent } from '../../../../shared/components/err-mess/err-mess.component';
import { AuthResponse, User } from '../../models/response/auth-response.js';
import { LoggedUserData } from '../../models/store/logged-user-data.js';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [
    InputTextModule,
    RouterLink,
    ButtonDirective,
    ToggleThemeComponent,
    ReactiveFormsModule,
    ErrMessComponent,
  ],
})
export class SigninComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private messageService = inject(MessageService);
  authService = inject(AuthService);

  isLoading: WritableSignal<boolean> = signal(false);
  hidePassword: WritableSignal<boolean> = signal(true);
  signinForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });
  constructor() {}

  ngOnInit() {}

  get usernameController() {
    return this.signinForm.get('username')!;
  }
  get passwordController() {
    return this.signinForm.get('password')!;
  }

  togglePassword() {
    this.hidePassword.update((v) => !v);
  }

  signin() {
    this.isLoading.set(true);
    this.authService
      .signin(this.signinForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: AuthResponse) => {
          this.isLoading.set(false);
          sessionStorage.setItem('roseToken', JSON.stringify(res.token));
          this.prepareLoggedUser(res.user);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }

  resetForm() {
    this.signinForm.reset();
  }

  prepareLoggedUser(user: User) {
    const userData: LoggedUserData = {
      email: user.email,
      role: user.role,
      username: user.username,
    };
    this.authService.setUser(userData, true);
    this.messageService.add({
      severity: 'success',
      summary: 'signedin successfully.',
      detail: 'Welcome to Rose app.',
    });
    // check about user.role to decide whether navigate to home layout,
    // or admin layout
    this.router.navigate(['/']);
  }
}
