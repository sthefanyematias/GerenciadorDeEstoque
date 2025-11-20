import { Produto } from '../types/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly API = 'http://localhost:3000/estoque';

  constructor(private http: HttpClient) { }

  private handleApiError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido na comunicação com a API.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do Cliente: ${error.error.message}`;
    } else if (error.status === 404) {
      errorMessage = 'Recurso não encontrado (404). Verifique o endpoint da API.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Erro do Servidor: ${error.status} - ${error.statusText || 'Falha na Requisição'}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto).pipe(
      catchError(this.handleApiError.bind(this))
    );
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API).pipe(
      catchError(this.handleApiError.bind(this))
    );
  }
  
  private handleBuscaError(error: HttpErrorResponse): Observable<Produto | undefined> {
    if (error.status === 404) {
      return new Observable(subscriber => {
          subscriber.next(undefined); 
          subscriber.complete();
      });
    }
    return throwError(() => new Error('Falha na comunicação com a API.'));
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`).pipe(
      catchError(this.handleApiError.bind(this))
    ); 
  }

  buscarPorId(id: number): Observable<Produto | undefined> {
    const url = `${this.API}/${id}`;
    return this.http.get<Produto>(url).pipe(
      catchError(this.handleBuscaError.bind(this))
    );
  }

  editar(produto: Produto): Observable<Produto> {
    const url = `${this.API}/${produto.id}`
    return this.http.put<Produto>(url, produto).pipe(
      catchError(this.handleApiError.bind(this))
    );
  }

  atualizarQuantidade(id: number, novaQuantidade: number): Observable<Produto> {
    const url = `${this.API}/${id}`;
    return this.http.patch<Produto>(url, { quantidade: novaQuantidade }).pipe(
      catchError(this.handleApiError.bind(this))
    ); 
  }
}