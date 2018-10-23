import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaAppInicioComponent } from './baja-app-inicio.component';

describe('BajaAppInicioComponent', () => {
  let component: BajaAppInicioComponent;
  let fixture: ComponentFixture<BajaAppInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaAppInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaAppInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
