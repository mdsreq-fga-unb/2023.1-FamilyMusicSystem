import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-teachers-view',
  templateUrl: './teachers-view.component.html',
  styleUrls: ['./teachers-view.component.scss']
})
export class TeachersViewComponent implements OnInit {
  public onClose : Subject<boolean>;
  public teacher : Teacher;

  constructor(
    private bsModalRef : BsModalRef,
  ) {}

  ngOnInit(): void {

  }

  sair(){
    this.bsModalRef.hide();
  }
}