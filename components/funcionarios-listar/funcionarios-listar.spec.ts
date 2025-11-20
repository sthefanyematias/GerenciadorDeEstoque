import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosListar } from './funcionarios-listar';

describe('FuncionariosListar', () => {
  let component: FuncionariosListar;
  let fixture: ComponentFixture<FuncionariosListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
