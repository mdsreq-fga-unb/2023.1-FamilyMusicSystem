import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {
  public onClose : Subject<boolean>;
  constructor(
    private bsModalRef : BsModalRef,
  ) {}

  ngOnInit(): void {

  }

  sair(){
    this.bsModalRef.hide();
  }
}
