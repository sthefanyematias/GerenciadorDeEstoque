import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/types/types';
import { ProdutosService } from '../../core/services/produtos.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HostListener } from '@angular/core';

@Component({
    selector: 'app-listar',
    standalone: true,
    imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
    templateUrl: './listar.html',
    styleUrl: './listar.css',
})
export class Listar implements OnInit {

    readonly LIMITE_ALERTA = 20;
    readonly LIMITE_CRITICO = 5;

    listaProdutos: Produto[] = [];
    podeVerAcoes: boolean = false;
    tooltipText = '';
    tooltipVisible = false;
    tooltipX = 0;
    tooltipY = 0;

    constructor(
        private service: ProdutosService,
        private router: Router,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
        this.podeVerAcoes = this.authService.isOperador() || this.authService.isAdmin();
        this.carregarProdutos();
    }

    carregarProdutos(): void {
        this.service.listar().subscribe({
            next: (produtos) => {
                this.listaProdutos = produtos;
            },
            error: (err) => {
                console.error('Falha na comunicação com o JSON-Server:', err);
                alert('ERRO: Não foi possível carregar a lista de produtos. Verifique a API.');
            }
        });
    }

    excluir(id: number): void {
        if (id) {
            this.service.excluir(id).subscribe({
                next: () => {
                    this.listaProdutos = this.listaProdutos.filter(
                        produto => produto.id !== id
                    );
                    console.log(`Produto ID ${id} excluído de forma imediata.`);
                },
                error: (err) => {
                    console.error('Erro ao excluir produto:', err);
                    alert('Falha ao excluir. Verifique a conexão com o servidor. (A exclusão foi bloqueada)');
                }
            });
        }
    }

    checkEstoqueStatus(quantidade: number): string {
        if (quantidade <= this.LIMITE_CRITICO) {
            return 'status-critico';
        } else if (quantidade <= this.LIMITE_ALERTA) {
            return 'status-alerta';
        } else {
            return 'status-ok';
        }
    }

    getTooltipMessage(quantidade: number): string {
        if (quantidade <= this.LIMITE_CRITICO) {
            return 'Estoque crítico! Contate o fornecedor para repor este produto.';
        } else if (quantidade <= this.LIMITE_ALERTA) {
            return 'Estoque em nível de alerta. Planeje uma nova compra em breve.';
        } else {
            return 'Estoque adequado.';
        }
    }

    onMouseEnter(event: MouseEvent, message: string) {
        this.tooltipText = message;
        this.tooltipVisible = true;
        this.tooltipX = event.clientX + 15;
        this.tooltipY = event.clientY - 10;
        this.updateTooltipPosition();
    }

    onMouseLeave() {
        this.tooltipVisible = false;
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (this.tooltipVisible) {
            this.tooltipX = event.clientX + 15;
            this.tooltipY = event.clientY - 10;
            this.updateTooltipPosition();
        }
    }

   updateTooltipPosition() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.left = `${this.tooltipX}px`;
        tooltip.style.top = `${this.tooltipY}px`;
        tooltip.textContent = this.tooltipText;
        tooltip.classList.remove('critico', 'alerta', 'ok');

        if (this.tooltipText.includes('crítico')) {
            tooltip.classList.add('critico');
        } else if (this.tooltipText.includes('alerta')) {
            tooltip.classList.add('alerta');
        } else {
            tooltip.classList.add('ok');
        }

        tooltip.classList.add('show');
    }
}
}