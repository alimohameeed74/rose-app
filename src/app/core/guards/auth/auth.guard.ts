import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const token = sessionStorage.getItem('roseToken') as string;
  if (token) {
    return true;
  } else {
    messageService.add({
      severity: 'error',
      summary: 'Access Denied.',
      detail: 'Please signin first.',
    });
    return router.createUrlTree(['/']);
  }
};
