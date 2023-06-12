import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleRegisterComponent } from './schedule-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('ScheduleRegisterComponent', () => {
  let component: ScheduleRegisterComponent;
  let fixture: ComponentFixture<ScheduleRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleRegisterComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
      imports: [MatIconModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
