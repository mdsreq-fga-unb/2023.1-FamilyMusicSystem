import { ComponentFixture, TestBed } from '@angular/core/testing';
import { roomListComponent } from './room-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';

describe('roomListComponent', () => {
  let component: roomListComponent;
  let fixture: ComponentFixture<roomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [roomListComponent],
      providers: [BsModalService],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(roomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
