import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoRegistroComponent } from './turno-registro.component';

describe('TurnoRegistroComponent', () => {
  let component: TurnoRegistroComponent;
  let fixture: ComponentFixture<TurnoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
