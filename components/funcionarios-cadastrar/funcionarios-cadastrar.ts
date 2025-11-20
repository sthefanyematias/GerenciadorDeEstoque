import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from '../../core/types/types'; 
import { FuncionariosService } from '../../core/services/funcionarios.service';

@Component({
  selector: 'app-funcionarios-cadastrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionarios-cadastrar.html',
  styleUrl: './funcionarios-cadastrar.css',
})
export class FuncionariosCadastrar implements OnInit {
  idPrevisto: string = ''; 
  funcionario: Partial<Funcionario> = this.getFuncionarioDefault(); 
  mensagemSucesso: string = '';
  erroMensagem: string = '';
  
  opcoesRole = [
    { value: 'admin', label: 'Administrador (Total)' },
    { value: 'operador', label: 'Operador (Edição/Criação)' },
    { value: 'consulta', label: 'Consulta (Visualização)' }
  ];

  constructor(
    private service: FuncionariosService,
    private router: Router
  ) { }

  getFuncionarioDefault(): Partial<Funcionario> {
    return {
      nome: '',
      cargo: '',
      setor: '',
      salario: 0,
      data_admissao: new Date().toISOString().substring(0, 10), 
      role: 'operador', 
      senha: '',        
      onboarded: false, 
      email: '', 
    };
  }
  
  gerarIdRandomico(): string {
    const id = Math.floor(10000 + Math.random() * 90000);
    return String(id);
  }

  ngOnInit(): void {
    this.idPrevisto = this.gerarIdRandomico(); 
    (this.funcionario as any).id = this.idPrevisto;
  }

  cadastrarFuncionario(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (!this.funcionario.nome || !this.funcionario.senha || !this.funcionario.cargo || !this.funcionario.email) {
        this.erroMensagem = 'Nome, Cargo, Senha e E-mail são obrigatórios.';
        return;
    }

    const novoFuncionario = this.funcionario as Funcionario;

    this.service.incluir(novoFuncionario).subscribe({ 
    next: (f) => {
      this.mensagemSucesso = `Funcionário '${f.nome}' cadastrado com sucesso! ID gerado: ${f.id}`;
      this.funcionario = this.getFuncionarioDefault();
      this.idPrevisto = this.gerarIdRandomico(); 
      (this.funcionario as any).id = this.idPrevisto; 

      setTimeout(() => this.router.navigate(['/funcionarios']), 3000);
    },
        error: (err) => {
            this.erroMensagem = 'Falha ao cadastrar funcionário. Verifique a API.';
            console.error('Erro de inclusão:', err);
        }
    });
  }
}