import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service'; 

@Component({
  selector: 'app-funcionarios-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './funcionarios-excluir.html',
  styleUrl: './funcionarios-excluir.css',
})
export class FuncionariosExcluir {
  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(
    private service: FuncionariosService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService 
  ) {
  }

  excluirFuncionario(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';
    const id = this.idExcluir;

    if (id != null) {
        const titulo = 'Atenção: Exclusão Irreversível';
        const mensagem = `Você está prestes a EXCLUIR o funcionário de ID ${id}. Esta ação não pode ser desfeita. Deseja continuar?`;

        this.notificationService.confirmarAcao(titulo, mensagem)
            .subscribe(confirmado => {
                
                if (confirmado) {
                    this.service.excluir(id).subscribe({
                        next: () => {
                            this.mensagemSucesso = `Funcionário com ID ${id} excluído com sucesso.`;
                            this.idExcluir = null;
                            setTimeout(() => this.router.navigate(['/funcionarios']), 1500);
                        },
                        error: (err) => {
                            this.erroMensagem = `Erro ao excluir o funcionário. Verifique se o ID existe ou a conexão com a API.`;
                            console.error('Erro de exclusão de funcionário:', err);
                            this.notificationService.mostrarAviso(
                                'Falha na API', 
                                this.erroMensagem
                            );
                        }
                    });
                } else {
                    this.erroMensagem = 'Exclusão cancelada pelo usuário.';
                }
            });
            
    } else {
      this.erroMensagem = 'Por favor, informe um ID para exclusão.';
    }
  }
}