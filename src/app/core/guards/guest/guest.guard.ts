import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../features/auth/services/auth.service.js';
import { Role } from '../../enums/role.enum.js';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('roseToken') as string;
  const role = Role;
  if (token) {
    messageService.add({
      severity: 'success',
      summary: 'already signedin.',
      detail: 'Welcome to Rose app.',
    });
    if (authService.loggedUserData_()?.role === role.ADMIN) {
      return router.createUrlTree(['/admin']);
    } else {
      return router.createUrlTree(['/']);
    }
  } else {
    return true;
  }
};
