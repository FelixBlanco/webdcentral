import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgInicioComponent } from './img-inicio.component';

describe('ImgInicioComponent', () => {
  let component: ImgInicioComponent;
  let fixture: ComponentFixture<ImgInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
