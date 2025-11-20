import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Produto } from '../../core/types/types'; 
import { ProdutosService } from '../../core/services/produtos.service'; 

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})

export class Editar implements OnInit { 
  form!: FormGroup;
  idProduto!: number; 
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private produtosService: ProdutosService 
  ) { }

  ngOnInit(): void {
    this.idProduto = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      id: [{ value: this.idProduto, disabled: true }], 
      nome: ['', Validators.required],
      fabricante: ['', Validators.required],
      data_fabricacao: ['', Validators.required],
      data_validade: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidade: [0, [Validators.required, Validators.min(0)]], 
    });

    this.produtosService.buscarPorId(this.idProduto).subscribe({
        next: (produto) => {
            if (produto) {
                this.form.patchValue(produto);
            } else {
                console.error("Produto não encontrado.");
                this.erroMensagem = 'Produto não encontrado na base de dados.';
            }
        },
        error: (err) => {
            console.error("Erro ao carregar produto:", err);
            this.erroMensagem = 'Falha ao carregar o produto. Verifique a API.';
        }
    });
  }

  onSubmit() {
    if (this.form.valid) {
        this.erroMensagem = '';
        this.mensagemSucesso = ''; 

      const produtoAtualizado: Produto = {
        ...this.form.getRawValue(),
        id: this.idProduto, 
      };

      this.produtosService.editar(produtoAtualizado).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto atualizado com sucesso!'; 
          setTimeout(() => this.router.navigate(['/listar']), 3000); 
        },
        error: (err) => {
            console.error("Erro ao editar produto:", err);
            this.erroMensagem = 'Erro ao salvar: Falha na comunicação com o servidor.'; 
        }
      });
    }
  }
}