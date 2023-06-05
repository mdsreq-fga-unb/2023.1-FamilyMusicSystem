import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomListComponent } from './room-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';

describe('RoomListComponent', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomListComponent],
      providers: [BsModalService],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
