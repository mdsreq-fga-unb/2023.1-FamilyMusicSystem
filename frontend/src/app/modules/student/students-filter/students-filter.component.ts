import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public studentFilterForm: FormGroup;


  constructor(
    private bsModalRef : BsModalRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentFilterForm = this.fb.group({
      typeFilter1 : null,
      typeFilter2 : null,
      genderStudentFilter : null,
      dateStudentFilter1 : null,
      dateStudentFilter2 : null,
      ageStudentFilter : null
      

    });
  }

  sair(){
    this.bsModalRef.hide();
  }
}