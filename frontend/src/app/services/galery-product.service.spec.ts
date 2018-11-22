import { TestBed } from '@angular/core/testing';

import { GaleryProductService } from './galery-product.service';

describe('GaleryProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaleryProductService = TestBed.get(GaleryProductService);
    expect(service).toBeTruthy();
  });
});
