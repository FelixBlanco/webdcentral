import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesInicioComponent } from './novedades-inicio.component';

describe('NovedadesInicioComponent', () => {
  let component: NovedadesInicioComponent;
  let fixture: ComponentFixture<NovedadesInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovedadesInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
