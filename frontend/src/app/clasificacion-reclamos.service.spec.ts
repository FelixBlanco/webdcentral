import { TestBed } from '@angular/core/testing';

import { ClasificacionReclamosService } from './clasificacion-reclamos.service';

describe('ClasificacionReclamosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasificacionReclamosService = TestBed.get(ClasificacionReclamosService);
    expect(service).toBeTruthy();
  });
});
