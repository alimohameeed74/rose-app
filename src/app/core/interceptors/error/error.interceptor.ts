import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { DailogService } from '../../../shared/services/attention-dialog/dailog.service.js';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const dialogService = inject(DailogService);

  return next(req).pipe(
    catchError((err) => {
      const customError = {
        status: err.error.status,
        code: err.error.code,
        message: err.error.message,
      };
      messageService.add({
        severity: 'error',
        summary: 'Something went wrong',
        detail: customError.message,
      });

      if (customError.code === 401 && customError.message === 'Invalid or expired token.') {
        dialogService.show();
      }

      return throwError(() => customError);
    }),
  );
};
