import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoModal } from './aviso-modal';

describe('AvisoModal', () => {
  let component: AvisoModal;
  let fixture: ComponentFixture<AvisoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
