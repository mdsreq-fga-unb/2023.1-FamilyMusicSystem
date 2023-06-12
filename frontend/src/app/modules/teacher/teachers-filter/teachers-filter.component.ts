import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { subYears, format } from 'date-fns';

@Component({
  selector: 'app-teachers-filter',
  templateUrl: './teachers-filter.component.html',
  styleUrls: ['./teachers-filter.component.scss'],
})
export class TeachersFilterComponent {
  public onClose: Subject<any> = new Subject<any>();
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public numreq = 0;
  public teacherFilterForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.teacherFilterForm = this.fb.group({
      createdAt: null,
      genderteacherFilter: null,
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    const formValues = this.teacherFilterForm.value;
    const filters = [];
    this.numreq = 0;

    if (formValues.createdAt !== null) {
      filters.push(`sort[${this.numreq}]=createdAt:${formValues.createdAt}`);
      this.numreq++;
    }

    if (formValues.genderteacherFilter !== null) {
      filters.push(
        `filters[gender][$in][${this.numreq}]=${formValues.genderteacherFilter}`
      );
      this.numreq++;
    }

    const urlParams = filters.join('&');
    const url = `?${urlParams}`;

    this.onClose.next(url);
    this.bsModalRef.hide();
  }
}
