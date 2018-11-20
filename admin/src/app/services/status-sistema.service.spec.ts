import { TestBed } from '@angular/core/testing';

import { StatusSistemaService } from './status-sistema.service';

describe('StatusSistemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusSistemaService = TestBed.get(StatusSistemaService);
    expect(service).toBeTruthy();
  });
});
