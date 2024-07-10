import { TestBed } from '@angular/core/testing';

import { GraficoService } from './grafico.service';

describe('GraficoService', () => {
  let service: GraficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
