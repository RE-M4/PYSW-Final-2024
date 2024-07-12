import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAltasComponent } from './turnos-altas.component';

describe('TurnosAltasComponent', () => {
  let component: TurnosAltasComponent;
  let fixture: ComponentFixture<TurnosAltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosAltasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnosAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
