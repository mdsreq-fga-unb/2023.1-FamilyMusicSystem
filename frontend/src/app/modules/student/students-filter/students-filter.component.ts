import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.scss'],
})
export class StudentsFilterComponent implements OnInit {
  public onClose: Subject<any> = new Subject<any>();
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public studentFilterForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentFilterForm = this.fb.group({
      createdAt: null,
      genderStudentFilter: null,
      dateStudentFilter1: null,
      dateStudentFilter2: null,
      ageStudentFilter: null,
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    
    const formValues = this.studentFilterForm.get('genderStudentFilter')?.value;
    console.log(formValues);

    this.onClose.next(formValues);
    this.bsModalRef.hide();
  }
}
