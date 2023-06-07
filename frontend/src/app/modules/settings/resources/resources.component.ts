import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  sair() {
    this.bsModalRef.hide();
  }
}
