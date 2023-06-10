import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsAlertComponent } from './students-alert.component';

describe('StudentsAlertComponent', () => {
  let component: StudentsAlertComponent;
  let fixture: ComponentFixture<StudentsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
