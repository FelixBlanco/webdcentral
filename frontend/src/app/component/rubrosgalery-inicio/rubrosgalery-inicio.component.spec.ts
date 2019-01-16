import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosgaleryInicioComponent } from './rubrosgalery-inicio.component';

describe('RubrosgaleryInicioComponent', () => {
  let component: RubrosgaleryInicioComponent;
  let fixture: ComponentFixture<RubrosgaleryInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrosgaleryInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosgaleryInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
