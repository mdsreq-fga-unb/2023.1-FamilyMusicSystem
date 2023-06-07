import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsRegisterComponent } from './students-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('StudentsRegisterComponent', () => {
  let component: StudentsRegisterComponent;
  let fixture: ComponentFixture<StudentsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsRegisterComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
      imports: [MatIconModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
