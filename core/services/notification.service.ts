import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { first } from 'rxjs';

interface ModalData {
  titulo: string;
  mensagem: string;
}

interface ConfirmData extends ModalData {
    confirmacao: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private modalSubject = new Subject<ModalData | null>(); 
  private confirmSubject = new Subject<ConfirmData | null>();
  private lastConfirmResponse: Subject<boolean> = new Subject<boolean>();

  modalState$: Observable<ModalData | null> = this.modalSubject.asObservable();
  confirmState$: Observable<ConfirmData | null> = this.confirmSubject.asObservable(); 

  constructor() {}

  mostrarAviso(titulo: string, mensagem: string): void {
    this.modalSubject.next({ titulo, mensagem });
  }

  fecharAviso(): void {
    this.modalSubject.next(null);
  }
  
  confirmarAcao(titulo: string, mensagem: string): Observable<boolean> {
      this.confirmSubject.next({ titulo, mensagem, confirmacao: true }); 
      return this.lastConfirmResponse.asObservable().pipe(first());
  }

  setConfirmResponse(resposta: boolean): void {
      this.confirmSubject.next(null); 
      this.lastConfirmResponse.next(resposta); 
  }
}