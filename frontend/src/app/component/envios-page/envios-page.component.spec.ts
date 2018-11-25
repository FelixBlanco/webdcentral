import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosPageComponent } from './envios-page.component';

describe('EnviosPageComponent', () => {
  let component: EnviosPageComponent;
  let fixture: ComponentFixture<EnviosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
