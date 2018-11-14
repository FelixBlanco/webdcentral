import { TestBed } from '@angular/core/testing';

import { PerfilClienteService } from './perfil-cliente.service';

describe('PerfilClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilClienteService = TestBed.get(PerfilClienteService);
    expect(service).toBeTruthy();
  });
});
