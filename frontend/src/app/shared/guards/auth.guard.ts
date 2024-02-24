import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first, map, retry } from 'rxjs';
import { Auth } from '@angular/fire/auth';

export const authGuard = (): CanActivateFn => {
  return () => {
    let authService = inject(AuthService);
    let router = inject(Router);

    return authService.auth$.pipe(
      map((user) => {
        return !!user || router.parseUrl('auth/login');
      }),
    );
  };
};
