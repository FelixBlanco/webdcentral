import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBlogComponent } from './categoria-blog.component';

describe('CategoriaBlogComponent', () => {
  let component: CategoriaBlogComponent;
  let fixture: ComponentFixture<CategoriaBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
