import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main { 
    constructor(private notificationService: NotificationService) {} 

    funcionalidadeEmBreve(nome: string): void {
        this.notificationService.mostrarAviso(
            'Em Construção',
            `A funcionalidade "${nome}" estará disponível em breve. Agradecemos sua paciência!`
        );
    }
}