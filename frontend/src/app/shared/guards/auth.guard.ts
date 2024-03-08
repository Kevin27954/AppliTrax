import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (): CanActivateFn => {
  return () => {
    let authService = inject(AuthService);
    let router = inject(Router);

    return authService.isAuth() || router.parseUrl('auth/login');
  };
};
