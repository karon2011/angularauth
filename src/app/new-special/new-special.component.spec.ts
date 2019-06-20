import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpecialComponent } from './new-special.component';

describe('NewSpecialComponent', () => {
  let component: NewSpecialComponent;
  let fixture: ComponentFixture<NewSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
