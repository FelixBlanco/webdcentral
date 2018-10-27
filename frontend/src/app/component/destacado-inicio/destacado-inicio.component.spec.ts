import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacadoInicioComponent } from './destacado-inicio.component';

describe('DestacadoInicioComponent', () => {
  let component: DestacadoInicioComponent;
  let fixture: ComponentFixture<DestacadoInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestacadoInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestacadoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
