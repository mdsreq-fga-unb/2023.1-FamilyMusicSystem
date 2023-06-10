import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-students-alert',
  templateUrl: './students-alert.component.html',
  styleUrls: ['./students-alert.component.scss'],
})
export class StudentsAlertComponent {
  @Input() title: string;
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef) {}

  sair() {
    this.bsModalRef.hide();
  }
}
