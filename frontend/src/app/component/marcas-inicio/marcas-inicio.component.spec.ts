import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasInicioComponent } from './marcas-inicio.component';

describe('MarcasInicioComponent', () => {
  let component: MarcasInicioComponent;
  let fixture: ComponentFixture<MarcasInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
