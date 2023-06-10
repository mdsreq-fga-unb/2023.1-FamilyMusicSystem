import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teachers-alert',
  templateUrl: './teachers-alert.component.html',
  styleUrls: ['./teachers-alert.component.scss']
})
export class TeachersAlertComponent {
  @Input() title: string;
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef) {

  }

  sair() {
    this.bsModalRef.hide();
  }
}
