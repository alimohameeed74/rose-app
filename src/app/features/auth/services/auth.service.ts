import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  constructor() {}

  signIn() {}
  signUp() {}
  sendEmailverification() {}
  confirmEmailverification() {}
  forgetPassword() {}
  resetPassword() {}
}
