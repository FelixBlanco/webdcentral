import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosFilterComponent } from './rubros-filter.component';

describe('RubrosFilterComponent', () => {
  let component: RubrosFilterComponent;
  let fixture: ComponentFixture<RubrosFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrosFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
