import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css',
})
export class RecuperarSenha {
  idFuncionario: number | null = null;
  mensagemSucesso: string = '';
  erroMensagem: string = '';
  carregando: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  solicitarRecuperacao(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';
    
    if (!this.idFuncionario || String(this.idFuncionario).length < 4) {
      this.erroMensagem = 'Por favor, insira um ID de Funcionário válido (mínimo 4 dígitos).';
      return;
    }

    this.carregando = true; 

    this.authService.solicitarRecuperacao(this.idFuncionario).pipe(
      finalize(() => this.carregando = false) 
    ).subscribe({
      next: (emailEncontrado: string | undefined) => {
        if (emailEncontrado) {
          const emailParcial = emailEncontrado.replace(/(.{2})[^@]+/, '$1***'); 
          this.mensagemSucesso = `Instruções de redefinição enviadas para o e-mail: ${emailParcial}.`;
          
          this.idFuncionario = null; 
          
          setTimeout(() => {
            this.mensagemSucesso = '';
            this.router.navigate(['/login']);
          }, 5000);

        } else {
          this.erroMensagem = 'ID de Funcionário não encontrado ou não possui e-mail cadastrado.';
        }
      },
      error: (err) => {
        this.erroMensagem = 'Falha ao comunicar com o servidor. Tente novamente mais tarde.';
        console.error('Erro na API:', err);
      }
    });
  }
}