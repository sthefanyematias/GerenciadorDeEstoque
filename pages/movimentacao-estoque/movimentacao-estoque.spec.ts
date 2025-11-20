import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoEstoque } from './movimentacao-estoque';

describe('MovimentacaoEstoque', () => {
  let component: MovimentacaoEstoque;
  let fixture: ComponentFixture<MovimentacaoEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoEstoque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentacaoEstoque);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
