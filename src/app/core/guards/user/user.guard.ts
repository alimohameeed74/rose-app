import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service.js';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role } from '../../enums/role.enum.js';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const role = Role;

  if (authService.loggedUserData_()?.role === role.USER) {
    return true;
  } else {
    messageService.add({
      severity: 'error',
      summary: 'Access Denied.',
      detail: "Don't Have Permessions.",
    });
    return router.createUrlTree(['/admin']);
  }
};
