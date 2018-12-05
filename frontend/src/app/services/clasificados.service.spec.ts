import { TestBed } from '@angular/core/testing';

import { ClasificadosService } from './clasificados.service';

describe('ClasificadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasificadosService = TestBed.get(ClasificadosService);
    expect(service).toBeTruthy();
  });
});
