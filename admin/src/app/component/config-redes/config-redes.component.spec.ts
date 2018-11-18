import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRedesComponent } from './config-redes.component';

describe('ConfigRedesComponent', () => {
  let component: ConfigRedesComponent;
  let fixture: ComponentFixture<ConfigRedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
