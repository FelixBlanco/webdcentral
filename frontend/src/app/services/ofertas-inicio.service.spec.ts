import { TestBed } from '@angular/core/testing';

import { OfertasInicioService } from './ofertas-inicio.service';

describe('OfertasInicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfertasInicioService = TestBed.get(OfertasInicioService);
    expect(service).toBeTruthy();
  });
});
