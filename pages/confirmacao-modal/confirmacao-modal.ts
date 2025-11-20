import { NotificationService } from './../../core/services/notification.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-confirmacao-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao-modal.html',
  styleUrl: './confirmacao-modal.css',
})
export class ConfirmacaoModal {
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = '';

  constructor(private notificationService: NotificationService) { }

  responder(confirmado: boolean): void {
    this.notificationService.setConfirmResponse(confirmado);
  }
}