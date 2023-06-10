import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  dialogRef: MatDialogRef<ConfirmationComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  cancel() {
    this.confirmed.emit(false);
    this.dialogRef.close();
  }

  confirm() {
    this.confirmed.emit(true);
    this.dialogRef.close();
  }
}
