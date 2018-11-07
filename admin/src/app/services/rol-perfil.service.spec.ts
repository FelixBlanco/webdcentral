import { TestBed } from '@angular/core/testing';

import { RolPerfilService } from './rol-perfil.service';

describe('RolPerfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolPerfilService = TestBed.get(RolPerfilService);
    expect(service).toBeTruthy();
  });
});
