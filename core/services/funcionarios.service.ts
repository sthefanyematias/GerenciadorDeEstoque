import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs'; 
import { Funcionario } from '../types/types'; 

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  //private readonly API = 'http://localhost:3000/funcionarios'; 
  private readonly API = 'https://my-json-server.typicode.com/sthefanyematias/GerenciadorDeEstoque/funcionarios'; 

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<Funcionario | undefined> {
    if (error.status === 404) {
      return throwError(() => undefined); 
    }
    return throwError(() => new Error('Ocorreu um erro na API.'));
  }

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API);
  }

  buscarPorId(id: number): Observable<Funcionario | undefined> {
    const url = `${this.API}/${id}`;
    return this.http.get<Funcionario>(url).pipe(
      catchError(this.handleError)
    );
  }

  incluir(funcionario: Omit<Funcionario, 'id'>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.API, funcionario);
  }

  editar(funcionario: Partial<Funcionario>): Observable<Funcionario> {
    if (!funcionario.id) {
        return throwError(() => new Error('ID do funcionário ausente na edição.'));
    }
    const url = `${this.API}/${funcionario.id}`;
    return this.http.patch<Funcionario>(url, funcionario); 
  }

  alterarSenha(id: number, novaSenha: string): Observable<any> {
    return this.buscarPorId(id).pipe(
        switchMap((funcionario: Funcionario | undefined) => {
            if (!funcionario) {
                return throwError(() => new Error('Funcionário não encontrado.'));
            }
            const dadosAtualizados: Partial<Funcionario> = { 
                id: id,
                senha: novaSenha 
            };

            return this.editar(dadosAtualizados); 
        })
    );
  }

  excluir(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }
}
