import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosInicioComponent } from './reclamos-inicio.component';

describe('ReclamosInicioComponent', () => {
  let component: ReclamosInicioComponent;
  let fixture: ComponentFixture<ReclamosInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamosInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
