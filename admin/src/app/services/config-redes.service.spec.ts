import { TestBed } from '@angular/core/testing';

import { ConfigRedesService } from './config-redes.service';

describe('ConfigRedesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigRedesService = TestBed.get(ConfigRedesService);
    expect(service).toBeTruthy();
  });
});
