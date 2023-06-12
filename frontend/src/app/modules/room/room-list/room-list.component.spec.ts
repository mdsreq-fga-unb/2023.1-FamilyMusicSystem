import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomListComponent } from './room-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

describe('RoomListComponent', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomListComponent],
      providers: [
        BsModalService,
        MatDialogModule,
        MatIconModule,
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [MatDialogModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
