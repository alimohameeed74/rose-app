import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const token = sessionStorage.getItem('roseToken') as string;
  if (token) {
    messageService.add({
      severity: 'success',
      summary: 'already signedin.',
      detail: 'Welcome to Rose app.',
    });
    return router.createUrlTree(['/']);
  } else {
    return true;
  }
};
