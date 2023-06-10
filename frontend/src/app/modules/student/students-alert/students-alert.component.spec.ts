import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsAlertComponent } from './students-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('StudentsAlertComponent', () => {
  let component: StudentsAlertComponent;
  let fixture: ComponentFixture<StudentsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAlertComponent ],
      providers: [ MatDialogModule, MatIconModule, MatDialog, { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }  ],
        imports: [MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
