import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyResultsComponent } from './weekly-results.component';

describe('WeeklyResultsComponent', () => {
  let component: WeeklyResultsComponent;
  let fixture: ComponentFixture<WeeklyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
