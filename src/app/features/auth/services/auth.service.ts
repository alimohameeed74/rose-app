import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SigninRequest } from '../models/request/signin-request.js';
import { ConfigService } from '../../../core/services/config/config.service.js';
import { SendEmail } from '../models/request/send-email.js';
import { VerifyEmail } from '../models/response/verify-email.js';
import { SendOtp } from '../models/request/send-otp.js';
import { SignupRequest } from '../models/request/signup-request.js';
import { ApiResponse } from '../../../core/models/api-response.js';
import { AuthResponse, User } from '../models/response/auth-response.js';
import { LoggedUserData } from '../models/store/logged-user-data.js';
import { Router } from '@angular/router';
import { ForgetPassword } from '../models/request/forget-password.js';
import { ResetPassword } from '../models/request/reset-password.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  private router = inject(Router);

  private loggedUserData: WritableSignal<LoggedUserData | null> = signal(null);
  readonly loggedUserData_ = this.loggedUserData.asReadonly();
  private isUserlogged: WritableSignal<boolean> = signal(false);
  readonly isUserlogged_ = this.isUserlogged.asReadonly();
  constructor() {}

  signin(data: SigninRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<ApiResponse<AuthResponse>>(`${this.configService.devApiUrl_()}/auth/login`, data)
      .pipe(map((res) => res.payload));
  }
  signup(data: SignupRequest): Observable<ApiResponse<AuthResponse>> {
    return this.httpClient.post<ApiResponse<AuthResponse>>(
      `${this.configService.devApiUrl_()}/auth/register`,
      data,
    );
  }

  sendEmailverification(data: SendEmail): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/auth/send-email-verification`,
      data,
    );
  }

  confirmEmailverification(data: SendOtp): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/auth/confirm-email-verification`,
      data,
    );
  }

  forgetPassword(data: ForgetPassword): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/auth/forgot-password`,
      data,
    );
  }
  resetPassword(data: ResetPassword): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/auth/reset-password`,
      data,
    );
  }
  signout() {
    this.setUser(null, false);
    sessionStorage.removeItem('roseToken');
    this.router.navigate(['/']);
  }

  init() {
    const token = sessionStorage.getItem('roseToken') as string;
    if (token) {
      this.getUserProfile().subscribe({
        next: (user: User) => {
          const userData: LoggedUserData = {
            email: user.email,
            role: user.role,
            username: user.username,
          };
          this.setUser(userData, true);
        },
      });
    } else {
      this.setUser(null, false);
    }
  }

  setUser(user: LoggedUserData | null, isUserlogged: boolean) {
    this.loggedUserData.set(user);
    this.isUserlogged.set(isUserlogged);
  }

  getUserProfile(): Observable<User> {
    return this.httpClient
      .get<ApiResponse<{ user: User }>>(`${this.configService.devApiUrl_()}/users/profile`)
      .pipe(map((res) => res.payload.user));
  }
}
