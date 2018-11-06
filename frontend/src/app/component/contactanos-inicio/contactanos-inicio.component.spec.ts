import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactanosInicioComponent } from './contactanos-inicio.component';

describe('ContactanosInicioComponent', () => {
  let component: ContactanosInicioComponent;
  let fixture: ComponentFixture<ContactanosInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactanosInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactanosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
