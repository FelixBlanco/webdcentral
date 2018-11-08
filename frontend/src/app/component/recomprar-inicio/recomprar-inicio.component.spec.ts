import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomprarInicioComponent } from './recomprar-inicio.component';

describe('RecomprarInicioComponent', () => {
  let component: RecomprarInicioComponent;
  let fixture: ComponentFixture<RecomprarInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomprarInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomprarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
