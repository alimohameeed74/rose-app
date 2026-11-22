import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DailogService } from '../../../shared/services/attention-dialog/dailog.service.js';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const dialogService = inject(DailogService);
  const token = sessionStorage.getItem('roseToken') as string;
  if (token) {
    return true;
  } else {
    messageService.add({
      severity: 'error',
      summary: 'Access Denied.',
      detail: 'Please signin first.',
    });
    dialogService.show();
    return router.createUrlTree(['/']);
  }
};
