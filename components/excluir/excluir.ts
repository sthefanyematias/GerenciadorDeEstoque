import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../core/services/produtos.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-excluir',
  imports: [CommonModule, FormsModule],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css',
})
export class Excluir {
  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(private service: ProdutosService, public authService: AuthService, private notificationService: NotificationService) { }

  excluirProduto(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    const id = this.idExcluir;

    if (!this.authService.isOperador()) {
      this.erroMensagem = 'Você não tem permissão para realizar exclusões de produtos.';
      return;
    }

    if (id != null) {
      this.notificationService.confirmarAcao(
        'Confirmação de Exclusão Irreversível',
        `Você está prestes a EXCLUIR permanentemente o produto de ID ${id}. Esta ação não pode ser desfeita. Deseja continuar?`
      ).subscribe(confirmado => {

        if (confirmado) {
          this.service.excluir(id).subscribe({
            next: () => {
              this.mensagemSucesso = `Produto com ID ${id} excluído com sucesso.`;
              this.idExcluir = null;
            },
            error: (err) => {
              this.erroMensagem = `Erro ao excluir o produto.`;
              console.error('Erro de exclusão:', err);
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