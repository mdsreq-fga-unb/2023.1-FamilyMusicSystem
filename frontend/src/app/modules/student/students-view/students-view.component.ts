import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss']
})
export class StudentsViewComponent implements OnInit {
  public onClose : Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public student : Student;

  constructor(
    private bsModalRef : BsModalRef,
  ) {}

  ngOnInit(): void {

  }

  sair(){
    this.bsModalRef.hide();
  }
}