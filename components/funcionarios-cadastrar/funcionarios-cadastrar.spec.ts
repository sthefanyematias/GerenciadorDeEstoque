import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosCadastrar } from './funcionarios-cadastrar';

describe('FuncionariosCadastrar', () => {
  let component: FuncionariosCadastrar;
  let fixture: ComponentFixture<FuncionariosCadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosCadastrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosCadastrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
