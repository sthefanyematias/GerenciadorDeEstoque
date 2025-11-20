import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    idFuncionario: number | null = null; 
    senha: string = ''; 
    erroLogin: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    login(): void {
        this.erroLogin = ''; 

        if (!this.idFuncionario || !this.senha) {
            this.erroLogin = 'Por favor, informe o ID e a Senha.';
            return;
        }
        
        this.authService.login(this.idFuncionario!, this.senha).subscribe({
            next: (data) => {
                if (this.authService.isLoggedIn()) {
                    if (this.authService.needsOnboarding()) {
                         this.router.navigate(['/onboarding']);
                    } else {
                        console.log(`Login bem-sucedido para ID: ${this.idFuncionario}`);
                        this.router.navigate(['/']);
                    } 
                } else {
                    this.erroLogin = 'Credenciais inválidas. Verifique o ID e a Senha.';
                }
            },
            error: (err) => {
                this.erroLogin = 'Falha na comunicação com o servidor de autenticação.';
                console.error('Erro de API no login:', err);
            }
        });
    }
}
