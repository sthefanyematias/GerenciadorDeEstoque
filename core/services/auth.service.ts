import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, map, throwError, catchError, of } from 'rxjs'; 
import { Funcionario, AuthData } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_FUNCIONARIOS = 'http://localhost:3000/funcionarios';

  public funcionarioLogado: AuthData | null = null;

  constructor(private http: HttpClient) { 
    const savedAuth = localStorage.getItem('authData');
    if (savedAuth) {
      this.funcionarioLogado = JSON.parse(savedAuth);
    }
  }

getFuncionarioId$(): Observable<number | undefined> {
    return of(this.funcionarioLogado?.id);
}

  private handleAuthError(error: HttpErrorResponse): Observable<Funcionario | undefined> {
      if (error.status === 404) {
          return new Observable(subscriber => {
              subscriber.next(undefined); 
              subscriber.complete();
          });
      }
      return throwError(() => new Error('Falha na comunicação com a API.'));
  }

  login(id: number, senha: string): Observable<Funcionario | undefined> {
    return this.http.get<Funcionario>(`${this.API_FUNCIONARIOS}/${id}`).pipe(
      catchError(this.handleAuthError.bind(this)), 
      
      map(funcionario => {
          if (!funcionario) {
              this.logout();
              return undefined;
          }

          if (funcionario.senha === senha) {
              this.funcionarioLogado = {
                  id: funcionario.id,
                  nome: funcionario.nome,
                  role: funcionario.role,
                  onboarded: funcionario.onboarded,
              };
              localStorage.setItem('authData', JSON.stringify(this.funcionarioLogado));
              return funcionario;
          } else {
              this.logout();
              return undefined; 
          }
      })
    );
  }

  logout(): void {
    this.funcionarioLogado = null;
    localStorage.removeItem('authData');
  }

  isLoggedIn(): boolean {
    return !!this.funcionarioLogado;
  }
  
  needsOnboarding(): boolean {
    return this.isLoggedIn() && this.funcionarioLogado!.onboarded === false;
  }

  isAdmin(): boolean {
    return this.funcionarioLogado?.role === 'admin';
  }

  isOperador(): boolean {
    return this.funcionarioLogado?.role === 'operador' || this.isAdmin();
  }

solicitarRecuperacao(id: string | number): Observable<string | undefined> {
    const idString = String(id);
    const url = `${this.API_FUNCIONARIOS}?id=${idString}`;
    
    return this.http.get<Funcionario[]>(url).pipe(
      map(funcionarios => {
        const funcionario = funcionarios[0];
        if (funcionario && funcionario.email) {
          return funcionario.email;
        }
        return undefined; 
      }),
      catchError(error => {
        console.error('Erro na solicitação de recuperação:', error);
        return of(undefined);
      })
    );
  }
}

