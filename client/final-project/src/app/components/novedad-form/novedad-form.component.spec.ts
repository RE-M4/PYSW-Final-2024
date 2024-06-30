import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadFormComponent } from './novedad-form.component';

describe('NovedadFormComponent', () => {
  let component: NovedadFormComponent;
  let fixture: ComponentFixture<NovedadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovedadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
