import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosInicioComponent } from './envios-inicio.component';

describe('EnviosInicioComponent', () => {
  let component: EnviosInicioComponent;
  let fixture: ComponentFixture<EnviosInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
