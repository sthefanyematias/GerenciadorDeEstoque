import { ConfirmacaoModal } from './../../pages/confirmacao-modal/confirmacao-modal';
import { AvisoModal } from './../../pages/aviso-modal/aviso-modal';
import { Footer } from './../../pages/footer/footer';
import { Header } from './../../pages/header/header';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CommonModule, AvisoModal, ConfirmacaoModal],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'Gerenciador Supermercado Bom Preço';
  modalAberto: boolean = false;
  modalTitulo: string = '';
  modalMensagem: string = '';
  confirmModalAberto: boolean = false;
  confirmModalTitulo: string = '';
  confirmModalMensagem: string = '';

  private rotasMinimalistas: string[] = ['/login', '/onboarding', '/recuperar-senha'];

  exibirLayoutCompleto: boolean = true;

  constructor(public router: Router, private notificationService: NotificationService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const urlAtual = event.urlAfterRedirects;

      this.exibirLayoutCompleto = !this.rotasMinimalistas.includes(urlAtual);
    });
  }

  ngOnInit(): void {
    this.notificationService.modalState$.subscribe(data => {
        if (data) {
            this.modalTitulo = data.titulo;
            this.modalMensagem = data.mensagem;
            this.modalAberto = true;
        } else {
            this.modalAberto = false;
        }
    });

    this.notificationService.confirmState$.subscribe(data => {
      if (data) {
        this.confirmModalTitulo = data.titulo;
        this.confirmModalMensagem = data.mensagem;
        this.confirmModalAberto = true;
      } else {
        this.confirmModalAberto = false;
      }
    });
  }

  handleModalFechado(): void {
    this.notificationService.fecharAviso();
  }
}