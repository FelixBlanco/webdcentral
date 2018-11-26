import { TestBed } from '@angular/core/testing';

import { TipoFacturasService } from './tipo-facturas.service';

describe('TipoFacturasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoFacturasService = TestBed.get(TipoFacturasService);
    expect(service).toBeTruthy();
  });
});
