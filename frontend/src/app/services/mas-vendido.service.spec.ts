import { TestBed } from '@angular/core/testing';

import { MasVendidoService } from './mas-vendido.service';

describe('MasVendidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasVendidoService = TestBed.get(MasVendidoService);
    expect(service).toBeTruthy();
  });
});
