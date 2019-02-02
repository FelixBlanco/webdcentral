import { TestBed } from '@angular/core/testing';

import { ProductosFavoritosService } from './productos-favoritos.service';

describe('ProductosFavoritosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    expect(service).toBeTruthy();
  });
});
