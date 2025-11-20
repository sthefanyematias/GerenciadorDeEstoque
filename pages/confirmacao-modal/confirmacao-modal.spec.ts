import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoModal } from './confirmacao-modal';

describe('ConfirmacaoModal', () => {
  let component: ConfirmacaoModal;
  let fixture: ComponentFixture<ConfirmacaoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
