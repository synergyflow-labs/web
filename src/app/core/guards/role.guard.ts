import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { DEFAULT_USER_ROUTE, UserRole } from '@Core/config/role.config';

import { AuthService } from '@Features/auth/auth.service';

/**
 * Functional guard factory that ensures the authenticated user possesses the required role.
 * Redirects to the user's default role route or to /auth/login.
 */
export const roleGuard = (requiredRole: UserRole): CanMatchFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/auth/login']);
    }

    const currentUser = authService.currentUser();
    if (currentUser?.role !== requiredRole) {
      if (currentUser?.role && DEFAULT_USER_ROUTE[currentUser.role]) {
        return router.createUrlTree([DEFAULT_USER_ROUTE[currentUser.role]]);
      }
      return router.createUrlTree(['/auth/login']);
    }

    return true;
  };
};
