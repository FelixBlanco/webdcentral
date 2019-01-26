import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoLateralComponent } from './carrito-lateral.component';

describe('CarritoLateralComponent', () => {
  let component: CarritoLateralComponent;
  let fixture: ComponentFixture<CarritoLateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoLateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
