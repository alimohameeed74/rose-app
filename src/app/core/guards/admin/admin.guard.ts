import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service.js';
import { Role } from '../../enums/role.enum.js';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const role = Role;

  if (authService.loggedUserData_()?.role === role.ADMIN) {
    return true;
  } else {
    messageService.add({
      severity: 'error',
      summary: 'Access Denied.',
      detail: "Don't Have Permessions.",
    });
    return router.createUrlTree(['/main']);
  }
};
