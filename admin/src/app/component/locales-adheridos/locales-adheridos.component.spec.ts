import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesAdheridosComponent } from './locales-adheridos.component';

describe('LocalesAdheridosComponent', () => {
  let component: LocalesAdheridosComponent;
  let fixture: ComponentFixture<LocalesAdheridosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalesAdheridosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalesAdheridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
