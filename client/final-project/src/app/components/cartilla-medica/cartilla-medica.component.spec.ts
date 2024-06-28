import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartillaMedicaComponent } from './cartilla-medica.component';

describe('CartillaMedicaComponent', () => {
  let component: CartillaMedicaComponent;
  let fixture: ComponentFixture<CartillaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartillaMedicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartillaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
