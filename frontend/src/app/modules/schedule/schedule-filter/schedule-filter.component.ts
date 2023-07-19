import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { subYears, format } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent implements OnInit {
  public onClose: Subject<any> = new Subject<any>();
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public numreq = 0;
  public scheduleFilterForm: FormGroup;
  public formValues: any;
  public teacherId: string;
  public id: string;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.scheduleFilterForm = this.fb.group({
      studentName: null,
      teacherName: null,
      roomName: null,
    });
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    const formValues = this.scheduleFilterForm.value;
    const filters = [];

    this.id ? (this.numreq = 1) : (this.numreq = 0);

    if (formValues.studentName !== null) {
      filters.push(
        `filters[Student][$startsWithi][${this.numreq}]=${formValues.studentName}`
      );
      this.numreq++;
    }
    if (formValues.teacherName !== null) {
      filters.push(
        `filters[Teacher][$startsWithi][${this.numreq}]=${formValues.teacherName}`
      );
      this.numreq++;
    }
    if (formValues.roomName !== null) {
      filters.push(
        `filters[Room][$startsWithi][${this.numreq}]=${formValues.roomName}`
      );
      this.numreq++;
    }

    const urlParams = filters.join('&');
    const url = `${urlParams}`;

    this.onClose.next(url);
    this.bsModalRef.hide();
  }
}
