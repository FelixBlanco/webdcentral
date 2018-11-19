import { TestBed } from '@angular/core/testing';

import { SuscripcionService } from './suscripcion.service';

describe('SuscripcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuscripcionService = TestBed.get(SuscripcionService);
    expect(service).toBeTruthy();
  });
});
