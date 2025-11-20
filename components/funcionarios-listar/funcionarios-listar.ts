import { AuthService } from './../../core/services/auth.service';
import { FuncionariosService } from './../../core/services/funcionarios.service';
import { Funcionario } from './../../core/types/types';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'app-funcionarios-listar',
    standalone: true,
    imports: [CommonModule, DatePipe, RouterModule, CurrencyPipe],
    templateUrl: './funcionarios-listar.html',
    styleUrl: './funcionarios-listar.css',
})
export class FuncionariosListar implements OnInit {
    listaFuncionarios: Funcionario[] = [];
    erroMensagem: string = '';

    constructor(
        private service: FuncionariosService,
        public authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.carregarFuncionarios();
    }

    carregarFuncionarios(): void {
        this.service.listar().subscribe({
            next: (funcionarios) => {
                this.listaFuncionarios = funcionarios;
            },
            error: (err) => {
                console.error('Falha na comunicação com o JSON-Server:', err);
                this.erroMensagem = 'ERRO: Não foi possível carregar a lista de funcionários. Verifique a API.';
            }
        });
    }

    checkStatus(f: Funcionario): string {
        return f.onboarded ? 'Completo' : 'Aguardando 1º Acesso';
    }

    excluirFuncionario(id: number): void {

    if (!this.authService.isAdmin()) {
        this.notificationService.mostrarAviso(
            'Acesso Restrito', 
            'Você não tem permissão de Administrador para realizar exclusões.'
        );
        return;
    }

    const titulo = 'Confirmação de Exclusão Irreversível';
    const mensagem = `ATENÇÃO: Tem certeza que deseja excluir o funcionário ID ${id}? Esta ação é IRREVERSÍVEL.`;

    this.notificationService.confirmarAcao(titulo, mensagem)
        .subscribe(confirmado => {
            
            if (confirmado) {
                
                this.service.excluir(id).subscribe({
                    next: () => {
                        this.listaFuncionarios = this.listaFuncionarios.filter(f => f.id !== id);
                        this.notificationService.mostrarAviso(
                            'Sucesso!', 
                            `Funcionário ID ${id} excluído com sucesso.`
                        );
                    },
                    error: (err) => {
                        console.error('Erro ao excluir funcionário:', err);
                        this.notificationService.mostrarAviso(
                            'Falha na Exclusão', 
                            'Não foi possível excluir o funcionário. Verifique a conexão com a API.'
                        );
                    }
                });
            } else {
                this.notificationService.mostrarAviso('Cancelado', 'A exclusão do funcionário foi cancelada.');
            }
        });
  }
}