import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Classroom } from '../../../models/classroom';

@Component({
  selector: 'app-room-register',
  templateUrl: './room-register.component.html',
  styleUrls: ['./room-register.component.scss'],
})
export class RoomRegisterComponent implements OnInit {
  public onClose: Subject<boolean>;
  public edicao = false;
  public inicial = true;
  public classForm: FormGroup;
  error: any | undefined;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    const classRoom: Classroom = new Classroom();
    classRoom.Name = this.classForm.get('classNumber')?.value;
    classRoom.Capacity = this.classForm.get('classCapacity')?.value;
    const body = {
      data: classRoom,
    };

    this.http
      .post(
        'https://20231-familymusicsystem-production.up.railway.app/api/classrooms',
        body
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      classCapacity: [null, Validators.required],
      classNumber: [null, Validators.required],
    });
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  sair() {
    this.bsModalRef.hide();
  }
}
