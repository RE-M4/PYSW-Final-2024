import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosModBajaComponent } from './turnos-mod-baja.component';

describe('TurnosModBajaComponent', () => {
  let component: TurnosModBajaComponent;
  let fixture: ComponentFixture<TurnosModBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosModBajaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnosModBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
