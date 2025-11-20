import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  get nomeFuncionarioLogado(): string {
    return this.authService.funcionarioLogado?.nome || '';
  }

  fazerLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}