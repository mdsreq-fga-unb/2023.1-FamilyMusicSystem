import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFilterComponent } from './schedule-filter.component';

describe('ScheduleFilterComponent', () => {
  let component: ScheduleFilterComponent;
  let fixture: ComponentFixture<ScheduleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
