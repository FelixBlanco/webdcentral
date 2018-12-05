import { TestBed } from '@angular/core/testing';

import { LocalesAdheridosService } from './locales-adheridos.service';

describe('LocalesAdheridosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalesAdheridosService = TestBed.get(LocalesAdheridosService);
    expect(service).toBeTruthy();
  });
});
