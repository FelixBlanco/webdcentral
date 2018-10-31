import { TestBed } from '@angular/core/testing';

import { DestacadosService } from './destacados.service';

describe('DestacadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestacadosService = TestBed.get(DestacadosService);
    expect(service).toBeTruthy();
  });
});
