import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasVendidoInicioComponent } from './mas-vendido-inicio.component';

describe('MasVendidoInicioComponent', () => {
  let component: MasVendidoInicioComponent;
  let fixture: ComponentFixture<MasVendidoInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasVendidoInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasVendidoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
