import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Classroom } from '../../../models/classroom';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent {
  public onClose: Subject<boolean>;
  public edit = false;
  public room: Classroom = new Classroom();
  public inicial = true;
  public classForm: FormGroup;
  error: any | undefined;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  onEdit($classRoom: Classroom): void {
    const classRoom: Classroom = new Classroom();
    classRoom.Name = this.classForm.get('classNumber')?.value;
    classRoom.Capacity = this.classForm.get('classCapacity')?.value;
    const body = {
      data: classRoom,
    };

    this.http
      .put(
        `https://20231-familymusicsystem-production.up.railway.app/api/lessons/${$classRoom.id}`,
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
      classCapacity: [
        { value: this.room.Capacity, disabled: !this.edit },
        Validators.required,
      ],
      classNumber: [
        { value: this.room.Name, disabled: !this.edit },
        Validators.required,
      ],
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
