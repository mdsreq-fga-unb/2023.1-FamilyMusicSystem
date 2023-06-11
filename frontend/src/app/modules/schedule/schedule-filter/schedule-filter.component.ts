import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { subYears, format } from 'date-fns';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent {


  public onClose: Subject<any> = new Subject<any>();
  public Resp = false;
  public numreq = 0;
  public lessonFilterForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.lessonFilterForm = this.fb.group({
      teacher: null,
      student: null,
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    const formValues = this.lessonFilterForm.value;
    const filters = [];
    this.numreq = 0;

    if (formValues.teacher !== null) {
      filters.push(`sort[${this.numreq}]=createdAt:${formValues.teacher}`);
      this.numreq++;
    }

    if (formValues.student !== null) {
      filters.push(
        `filters[gender][$in][${this.numreq}]=${formValues.student}`
      );
      this.numreq++;
    }

    const urlParams = filters.join('&');
    const url = `?${urlParams}`;

    this.onClose.next(url);
    this.bsModalRef.hide();
  }



}
