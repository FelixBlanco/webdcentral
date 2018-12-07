import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinoristaComponent } from './minorista.component';

describe('MinoristaComponent', () => {
  let component: MinoristaComponent;
  let fixture: ComponentFixture<MinoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
