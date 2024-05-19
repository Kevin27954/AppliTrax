import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { from, map, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return from(authService.getToken()).pipe(
    switchMap((token) => {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + (token || '')),
      });
      return next(authReq);
    })
  );
};
