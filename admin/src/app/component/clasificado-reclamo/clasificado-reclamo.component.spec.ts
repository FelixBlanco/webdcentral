import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadoReclamoComponent } from './clasificado-reclamo.component';

describe('ClasificadoReclamoComponent', () => {
  let component: ClasificadoReclamoComponent;
  let fixture: ComponentFixture<ClasificadoReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadoReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadoReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
