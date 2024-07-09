import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoFormComponent } from './medico-form.component';

describe('MedicoFormComponent', () => {
  let component: MedicoFormComponent;
  let fixture: ComponentFixture<MedicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
