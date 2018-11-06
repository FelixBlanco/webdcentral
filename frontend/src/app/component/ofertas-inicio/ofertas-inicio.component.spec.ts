import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasInicioComponent } from './ofertas-inicio.component';

describe('OfertasInicioComponent', () => {
  let component: OfertasInicioComponent;
  let fixture: ComponentFixture<OfertasInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
