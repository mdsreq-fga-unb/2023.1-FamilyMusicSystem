import { Teacher } from '../../../models/teacher';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TeachersViewComponent } from './teachers-view.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TeachersViewComponent', () => {
  let component: TeachersViewComponent;
  let fixture: ComponentFixture<TeachersViewComponent>;

  beforeEach(async () => {
    const teacher = new Teacher();
    await TestBed.configureTestingModule({
      declarations: [TeachersViewComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersViewComponent);
    component = fixture.componentInstance;
    component.teacher = teacher;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
