import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosConsultar } from './funcionarios-consultar';

describe('FuncionariosConsultar', () => {
  let component: FuncionariosConsultar;
  let fixture: ComponentFixture<FuncionariosConsultar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosConsultar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosConsultar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
