import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss'],
})
export class ExpiredComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  dialogRef: MatDialogRef<ExpiredComponent>;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.confirmed.emit(true);
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
