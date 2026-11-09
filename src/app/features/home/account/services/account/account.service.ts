import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { User } from '../../../../auth/models/response/auth-response.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { UpdateUserProfile } from '../../models/update-user-profile.js';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';
import { ChangePasswordForm } from '../../models/change-password-form.js';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}
  getUserProfile(): Observable<User> {
    return this.httpClient
      .get<ApiResponse<{ user: User }>>(`${this.configService.devApiUrl_()}/users/profile`)
      .pipe(map((res) => res.payload.user));
  }

  updateUserProfile(data: UpdateUserProfile): Observable<User> {
    return this.httpClient
      .patch<ApiResponse<{ user: User }>>(`${this.configService.devApiUrl_()}/users/profile`, data)
      .pipe(map((res) => res.payload.user));
  }

  deleteAccount(): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/users/account`);
  }

  changePassword(data: ChangePasswordForm): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/users/change-password`,
      data,
    );
  }

  requestEmailChange(data: { newEmail: string }): Observable<VerifyEmail> {
    return this.httpClient.post<VerifyEmail>(
      `${this.configService.devApiUrl_()}/users/email/request`,
      data,
    );
  }
  confirmEmailChange(data: { code: string }): Observable<User> {
    return this.httpClient
      .post<ApiResponse<{ user: User }>>(
        `${this.configService.devApiUrl_()}/users/email/confirm`,
        data,
      )
      .pipe(map((res) => res.payload.user));
  }
}
