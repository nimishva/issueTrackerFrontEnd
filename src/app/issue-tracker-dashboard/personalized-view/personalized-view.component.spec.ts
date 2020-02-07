import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedViewComponent } from './personalized-view.component';

describe('PersonalizedViewComponent', () => {
  let component: PersonalizedViewComponent;
  let fixture: ComponentFixture<PersonalizedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
