import { TestBed } from '@angular/core/testing';

import { ConfgFooterService } from './confg-footer.service';

describe('ConfgFooterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfgFooterService = TestBed.get(ConfgFooterService);
    expect(service).toBeTruthy();
  });
});
