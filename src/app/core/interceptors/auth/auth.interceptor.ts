import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('roseToken') as string;
  if (token && req.url.includes('/users/profile')) {
    const token_ = JSON.parse(token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token_}`,
      },
    });
  }
  return next(req);
};
