import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosExcluir } from './funcionarios-excluir';

describe('FuncionariosExcluir', () => {
  let component: FuncionariosExcluir;
  let fixture: ComponentFixture<FuncionariosExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosExcluir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosExcluir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
