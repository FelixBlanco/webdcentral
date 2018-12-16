import { TestBed } from '@angular/core/testing';

import { TipoDescuentosService } from './tipo-descuentos.service';

describe('TipoDescuentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoDescuentosService = TestBed.get(TipoDescuentosService);
    expect(service).toBeTruthy();
  });
});
