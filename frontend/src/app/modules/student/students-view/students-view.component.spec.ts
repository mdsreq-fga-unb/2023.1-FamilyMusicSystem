import { Student } from '../../../models/student';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StudentsViewComponent } from './students-view.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('StudentsViewComponent', () => {
  let component: StudentsViewComponent;
  let fixture: ComponentFixture<StudentsViewComponent>;

  beforeEach(async () => {
    const student = new Student();
    await TestBed.configureTestingModule({
      declarations: [StudentsViewComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsViewComponent);
    component = fixture.componentInstance;
    component.student = student;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
