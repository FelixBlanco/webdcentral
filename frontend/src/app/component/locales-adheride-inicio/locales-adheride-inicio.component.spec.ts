import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesAdherideInicioComponent } from './locales-adheride-inicio.component';

describe('LocalesAdherideInicioComponent', () => {
  let component: LocalesAdherideInicioComponent;
  let fixture: ComponentFixture<LocalesAdherideInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalesAdherideInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalesAdherideInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
