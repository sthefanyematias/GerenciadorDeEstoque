import { NotificationService } from './../services/notification.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const perfilGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAdmin() || authService.isOperador()) {
    return true;
  } else {
    
    let titulo = 'Permissão Insuficiente';
    let mensagemCustomizada: string;
    
    const rotaAlvo = route.url[0].path; 

    if (rotaAlvo === 'cadastrar') {
        mensagemCustomizada = 'Você precisa ser Operador ou Administrador para cadastrar novos produtos no sistema.';
    } 
    else if (rotaAlvo === 'editar') { 
        mensagemCustomizada = 'Você não possui privilégios para editar informações do inventário.';
    }
    else if (rotaAlvo === 'excluir' || rotaAlvo === 'funcionarios') { 
        mensagemCustomizada = 'Esta ação é restrita a usuários com permissão de Gerenciamento.';
    }
    else {
        mensagemCustomizada = 'Você não possui a permissão necessária para acessar esta seção.';
    }

    notificationService.mostrarAviso(titulo, mensagemCustomizada);
    
    return false; 
  }
};