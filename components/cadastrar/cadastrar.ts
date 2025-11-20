import { ProdutosService } from './../../core/services/produtos.service';
import { Produto } from './../../core/types/types';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-cadastrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar implements OnInit { 
  titulo = 'Cadastro de Produtos';
  produto: Produto = {} as Produto;
  produtoCadastrado: Produto | null = null;

  mensagemSucesso: string = '';
  erroMensagem: string = '';
  idPrevisto: string = ''; 

  private idsExistentes: Set<string> = new Set();
  private produtoParaEnvio: Partial<Produto> = {} as Partial<Produto>; 

  constructor(
    private service: ProdutosService,
    private router: Router
  ) { }
  
  gerarIdRandomico(): string {
    const id = Math.floor(10000 + Math.random() * 90000);
    return String(id);
  }

  gerarIdUnico(): string {
    let novoId: string;
    do {
      const idNum = Math.floor(10000 + Math.random() * 90000);
      novoId = String(idNum);
    } while (this.idsExistentes.has(novoId)); 
    
    this.idsExistentes.add(novoId);
    return novoId;
  }
    
  ngOnInit(): void {
    this.service.listar().pipe(take(1)).subscribe({
        next: (produtos) => {
            produtos.forEach(p => this.idsExistentes.add(String(p.id))); 
            
            this.idPrevisto = this.gerarIdUnico();
            (this.produto as any).id = this.idPrevisto; 
        },
        error: (err) => {
             console.error('Falha ao carregar IDs existentes.', err);
             this.idPrevisto = this.gerarIdUnico(); 
             (this.produto as any).id = this.idPrevisto;
        }
    });
  }

  submeter() {
    this.produtoCadastrado = null;
    this.erroMensagem = '';
    this.mensagemSucesso = ''; 

    this.service.incluir(this.produto).subscribe({ 
      next: (response) => {
        this.mensagemSucesso = `Produto ${response.nome} cadastrado com sucesso!`; 
        this.produtoCadastrado = response;

        this.produto = {} as Produto; 
        
        this.idPrevisto = this.gerarIdUnico(); 
        (this.produto as any).id = this.idPrevisto; 

        setTimeout(() => {
          this.mensagemSucesso = '';
          this.produtoCadastrado = null; 
        }, 3000); 
      },
      error: (err: Error) => {
        console.error('Erro ao cadastrar produto:', err.message);
        this.erroMensagem = 'Falha ao cadastrar. Verifique a API ou se o ID já existe.'; 
      }
    });
  }
}