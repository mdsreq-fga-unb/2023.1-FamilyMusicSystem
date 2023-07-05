import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  dialogRef: MatDialogRef<AlertComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  cancel() {
    this.confirmed.emit(true);
    this.dialogRef.close();
  }
}
