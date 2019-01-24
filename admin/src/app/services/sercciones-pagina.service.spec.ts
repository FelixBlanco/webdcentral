import { TestBed } from '@angular/core/testing';

import { SeccionesPaginaService } from './secciones-pagina.service';

describe('SeccionesPaginaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeccionesPaginaService = TestBed.get(SeccionesPaginaService);
    expect(service).toBeTruthy();
  });
});
