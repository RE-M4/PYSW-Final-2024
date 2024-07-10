import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasComponent } from './pruebas.component';

describe('PruebasComponent', () => {
  let component: PruebasComponent;
  let fixture: ComponentFixture<PruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
