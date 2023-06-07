import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-teachers-filter',
  templateUrl: './teachers-filter.component.html',
  styleUrls: ['./teachers-filter.component.scss']
})
export class TeachersFilterComponent {
  public onClose : Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public teacherFilterForm: FormGroup;


  constructor(
    private bsModalRef : BsModalRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.teacherFilterForm = this.fb.group({
      typeFilter1 : null,
      typeFilter2 : null,
      genderTeacherFilter : null,
      dateTeacherFilter1 : null,
      dateTeacherFilter2 : null,
      ageTeacherFilter : null
      

    });
  }

  sair(){
    this.bsModalRef.hide();
  }
}
