import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryProductComponent } from './galery-product.component';

describe('GaleryProductComponent', () => {
  let component: GaleryProductComponent;
  let fixture: ComponentFixture<GaleryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
