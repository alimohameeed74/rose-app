import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('roseToken') as string;
  if (
    token &&
    (req.url.includes('/users/profile') ||
      req.url.includes('/cart') ||
      req.url.includes('/wishlist') ||
      req.url.includes('/review') ||
      req.url.includes('/users/account') ||
      req.url.includes('/users/change-password') ||
      req.url.includes('/users/email/request') ||
      req.url.includes('/users/email/confirm'))
  ) {
    const token_ = JSON.parse(token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token_}`,
      },
    });
  }
  return next(req);
};
