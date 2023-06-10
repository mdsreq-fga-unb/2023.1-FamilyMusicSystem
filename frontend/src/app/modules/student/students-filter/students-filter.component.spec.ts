import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsFilterComponent } from './students-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('StudentsFilterComponent', () => {
  let component: StudentsFilterComponent;
  let fixture: ComponentFixture<StudentsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsFilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
