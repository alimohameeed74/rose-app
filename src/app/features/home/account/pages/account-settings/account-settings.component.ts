import { Component, inject, OnInit } from '@angular/core';

import { ButtonDirective } from 'primeng/button';
import { Router, RouterLinkActive, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service.js';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  imports: [ButtonDirective, RouterLinkActive, RouterOutlet, RouterLinkWithHref],
})
export class AccountSettingsComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  ngOnInit() {}

  logout() {
    this.authService.signout();
  }
}
