import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Funcionario } from '../../core/types/types';
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'app-onboarding',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './onboarding.html',
    styleUrl: './onboarding.css',
})
export class Onboarding implements OnInit {
    idade: number | null = null;
    novaSenha: string = '';
    confirmarSenha: string = '';

    erroMensagem: string = '';

    funcionarioAtual!: Funcionario;

    constructor(
        public authService: AuthService,
        private router: Router,
        private funcionariosService: FuncionariosService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        if (!this.authService.isLoggedIn() || this.authService.funcionarioLogado?.onboarded) {
            this.router.navigate(['/']);
            return;
        }

        const id = this.authService.funcionarioLogado!.id;

        this.funcionariosService.buscarPorId(id).pipe(take(1)).subscribe({
            next: (data) => {
                if (data) {
                    this.funcionarioAtual = data;
                } else {
                    this.router.navigate(['/login']);
                }
            },
            error: () => {
                this.erroMensagem = 'Falha ao carregar dados. Tente novamente.';
            }
        });
    }

    completarOnboarding(form: NgForm): void {
        this.erroMensagem = '';

        if (!form.valid || !this.funcionarioAtual) {
            this.erroMensagem = 'Por favor, preencha todos os campos obrigatórios e verifique a senha.';
            return;
        }

        if (this.novaSenha !== this.confirmarSenha) {
            this.erroMensagem = 'As senhas digitadas não coincidem.';
            return;
        }

        const funcionarioEditado: Funcionario = {
            ...this.funcionarioAtual,
            senha: this.novaSenha,
            onboarded: true
            // idade: this.idade || undefined
        };

        this.funcionariosService.editar(funcionarioEditado).subscribe({
            next: () => {
                this.authService.funcionarioLogado!.onboarded = true;
                localStorage.setItem('authData', JSON.stringify(this.authService.funcionarioLogado));

                this.notificationService.mostrarAviso(
                    'Bem-vindo(a)!',
                    `Seu primeiro acesso foi concluído com sucesso. Boas-vindas, ${this.authService.funcionarioLogado!.nome}!`
                );

                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 500); 
            },
            error: () => {
                this.erroMensagem = 'Erro ao salvar dados. Verifique a API e tente novamente.';
            }
        });
    }
}