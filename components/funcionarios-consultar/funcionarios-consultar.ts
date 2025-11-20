import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Funcionario } from '../../core/types/types'; 
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-funcionarios-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe, RouterModule],
  templateUrl: './funcionarios-consultar.html',
  styleUrl: './funcionarios-consultar.css',
})
export class FuncionariosConsultar {
  
  idBusca: number | null = null; 
  funcionarioEncontrado: Funcionario | null = null; 
  erroBusca: string = ''; 
  
  constructor(
    private service: FuncionariosService,
    private router: Router,
    public authService: AuthService 
  ) { }

  buscarFuncionario(): void {
    this.erroBusca = '';
    this.funcionarioEncontrado = null;

    if (!this.idBusca) {
        this.erroBusca = 'Por favor, informe um ID de funcionário.';
        return;
    }

    this.service.buscarPorId(this.idBusca).subscribe({
        next: (funcionario) => {
            if (funcionario) {
                this.funcionarioEncontrado = funcionario;
            } else {
                this.erroBusca = `Funcionário com ID ${this.idBusca} não encontrado.`;
            }
        },
        error: (err) => {
            this.erroBusca = 'Falha na comunicação com o servidor. Verifique a API.';
            console.error('Erro de busca:', err);
        }
    });
  }

  checkStatus(f: Funcionario): string {
    return f.onboarded ? 'Completo' : 'Aguardando 1º Acesso';
  }
}
