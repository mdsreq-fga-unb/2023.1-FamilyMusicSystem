import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleViewComponent } from './schedule-view.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ScheduleViewComponent', () => {
  let component: ScheduleViewComponent;
  let fixture: ComponentFixture<ScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleViewComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
