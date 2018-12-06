import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadosInicioComponent } from './clasificados-inicio.component';

describe('ClasificadosInicioComponent', () => {
  let component: ClasificadosInicioComponent;
  let fixture: ComponentFixture<ClasificadosInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadosInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
