import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCarouselPageComponent } from './productos-carousel-page.component';

describe('ProductosCarouselPageComponent', () => {
  let component: ProductosCarouselPageComponent;
  let fixture: ComponentFixture<ProductosCarouselPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosCarouselPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCarouselPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
