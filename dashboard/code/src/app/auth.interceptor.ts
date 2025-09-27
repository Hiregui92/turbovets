// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const userId = authService.getUserId();

  if (req.url.includes('/login') || req.url.includes('/signup')) {
    return next(req);
  }
  let headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (userId) {
    headers['X-User-Id'] = userId.toString();
  }
  console.log(headers);

  if (Object.keys(headers).length > 0) {
    const authReq = req.clone({ setHeaders: headers });
    return next(authReq);
  }

  return next(req);
};

