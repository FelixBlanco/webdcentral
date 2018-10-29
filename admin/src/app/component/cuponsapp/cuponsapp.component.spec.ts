import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponsappComponent } from './cuponsapp.component';

describe('CuponsappComponent', () => {
  let component: CuponsappComponent;
  let fixture: ComponentFixture<CuponsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
