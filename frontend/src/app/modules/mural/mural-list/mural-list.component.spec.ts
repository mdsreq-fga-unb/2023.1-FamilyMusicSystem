import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MuralListComponent } from './mural-list.component';
import { BsModalService } from "ngx-bootstrap/modal";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('MuralListComponent', () => {
  let component: MuralListComponent;
  let fixture: ComponentFixture<MuralListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuralListComponent],
      providers: [
        BsModalService,
        MatDialogModule,
        MatIconModule,
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [HttpClientTestingModule, MatDialogModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });
});
