import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersAlertComponent } from './teachers-alert.component';

describe('TeachersAlertComponent', () => {
  let component: TeachersAlertComponent;
  let fixture: ComponentFixture<TeachersAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
