import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aviso-modal',
  imports: [],
  templateUrl: './aviso-modal.html',
  styleUrl: './aviso-modal.css',
})
export class AvisoModal {
@Input() titulo: string = 'Aviso do Sistema';
  @Input() mensagem: string = '';
  @Output() modalFechado = new EventEmitter<void>();

  fechar(): void {
    this.modalFechado.emit();
  }
}