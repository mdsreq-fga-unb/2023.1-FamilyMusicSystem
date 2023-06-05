import { ComponentFixture, TestBed } from '@angular/core/testing';
import { roomRegisterComponent } from './room-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('roomRegisterComponent', () => {
  let component: roomRegisterComponent;
  let fixture: ComponentFixture<roomRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [roomRegisterComponent],
      providers: [BsModalService],
      imports: [MatIconModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(roomRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
