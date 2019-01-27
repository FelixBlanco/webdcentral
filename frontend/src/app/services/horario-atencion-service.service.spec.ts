import { TestBed } from '@angular/core/testing';

import { HorarioAtencionServiceService } from './horario-atencion-service.service';

describe('HorarioAtencionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioAtencionServiceService = TestBed.get(HorarioAtencionServiceService);
    expect(service).toBeTruthy();
  });
});
