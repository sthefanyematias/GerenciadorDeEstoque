import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { NotificationService } from '../services/notification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService); 

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  
  if (authService.isAdmin()) {
    return true; 
  } else {
    notificationService.mostrarAviso(
        'Acesso Restrito',
        'Apenas Administradores podem acessar a gestão de funcionários.'
    );

    router.navigate(['/']); 
    return false;
  }
};