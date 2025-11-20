import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const onboardingGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  
  if (authService.needsOnboarding()) {
    if (state.url !== '/onboarding') {
        router.navigate(['/onboarding']);
        return false;
    }
    return true;
  }
  
  if (state.url === '/onboarding') {
      router.navigate(['/']);
      return false;
  }

  return true;
};
