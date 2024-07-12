import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosbajaComponent } from './turnosbaja.component';

describe('TurnosbajaComponent', () => {
  let component: TurnosbajaComponent;
  let fixture: ComponentFixture<TurnosbajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosbajaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnosbajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
