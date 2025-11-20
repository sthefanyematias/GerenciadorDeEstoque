import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosEditar } from './funcionarios-editar';

describe('FuncionariosEditar', () => {
  let component: FuncionariosEditar;
  let fixture: ComponentFixture<FuncionariosEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
