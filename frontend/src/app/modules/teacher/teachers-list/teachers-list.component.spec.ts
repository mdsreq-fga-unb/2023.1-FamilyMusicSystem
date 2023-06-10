import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TeachersListComponent } from './teachers-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeachersListComponent', () => {
  let component: TeachersListComponent;
  let fixture: ComponentFixture<TeachersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersListComponent],
      providers: [BsModalService],
      imports: [MatIconModule, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });
});
