import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-alert',
  templateUrl: './students-alert.component.html',
  styleUrls: ['./students-alert.component.scss']
})
export class StudentsAlertComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  dialogRef: MatDialogRef<StudentsAlertComponent>; // Adicione a declaração da referência do modal

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.confirmed.emit(false);
    this.dialogRef.close();
  }

  confirm() {
    this.confirmed.emit(true);
    this.dialogRef.close();
  }
}