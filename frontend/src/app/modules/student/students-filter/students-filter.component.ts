import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.scss']
})
export class StudentsFilterComponent implements OnInit {
  public onClose : Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;


  constructor(
    private bsModalRef : BsModalRef,
  ) {}

  ngOnInit(): void {

  }

  sair(){
    this.bsModalRef.hide();
  }
}