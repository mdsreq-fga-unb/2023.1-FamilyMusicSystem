import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { subYears, format } from 'date-fns';

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
  public numreq = 0;
  public studentFilterForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentFilterForm = this.fb.group({
      createdAt: null,
      genderStudentFilter: null,
      ageStudentFilter: null,
    });  
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    const formValues = this.studentFilterForm.value;
    const filters = [];
    this.numreq = 0;

    if (formValues.createdAt !== null) {
      filters.push(`sort[${this.numreq}]=createdAt:${formValues.createdAt}`);
      this.numreq++;
    }

    if (formValues.genderStudentFilter !== null) {
      filters.push(
        `filters[gender][$in][${this.numreq}]=${formValues.genderStudentFilter}`
      );
      this.numreq++;
    }

    if (formValues.ageStudentFilter !== null) {
      const currentDate = new Date();
      let filtersOperator = '';
      let ageLimit = 18;

      if (formValues.ageStudentFilter === 'under18') {
        filtersOperator = '$gte';
      } else if (formValues.ageStudentFilter === 'over18') {
        filtersOperator = '$lte';
      }

      const formattedDate = format(
        subYears(currentDate, ageLimit),
        'yyyy-MM-dd'
      );
      filters.push(
        `filters[Birthday][${filtersOperator}][${this.numreq}]=${formattedDate}`
      );
      this.numreq++;
    }

    const urlParams = filters.join('&');
    const url = `?${urlParams}`;

    this.onClose.next(url);
    this.bsModalRef.hide();
  }
}
