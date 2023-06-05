import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomRegisterComponent } from './room-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoomRegisterComponent', () => {
  let component: RoomRegisterComponent;
  let fixture: ComponentFixture<RoomRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomRegisterComponent],
      providers: [BsModalService],
      imports: [MatIconModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
