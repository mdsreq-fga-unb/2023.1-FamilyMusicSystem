import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Student>[];
}

@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.scss'],
})
export class StudentsRegisterComponent implements OnInit {
  public onClose: Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public student: Student;
  public studentForm: FormGroup;

  error: any | undefined;
  students$: Observable<Student[]> | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      nameStudent: [null, Validators.required],
      sobreStudent: [null, Validators.required],
      emailStudent: [null, Validators.required],
      phoneStudent: [null, Validators.required],
      cpfStudent: [null, Validators.required],
      rgStudent: [null, Validators.required],
      pcdStudent: [null, Validators.required],
      tipoPcdStudent: [null, Validators.required],
      genderStudent: [null, Validators.required],
      dateStudent: [null, Validators.required],

      nomeStudentResp: [null, Validators.required],
      sobreStudentResp: [null, Validators.required],
      cpfStudentResp: [null, Validators.required],
      rgStudentResp: [null, Validators.required],
      pcdStudentResp: [null, Validators.required],
      tipoPcdStudentResp: [null, Validators.required],
      genderStudentResp: [null, Validators.required],
      dateStudentResp: [null, Validators.required],

      cityStudent: [null, Validators.required],
      cepStudent: [null, Validators.required],
      stateStudent: [null, Validators.required],
      neighborhoodStudent: [null, Validators.required],
      adressStudent: [null, Validators.required],
      complementStudent: [null, Validators.required],
      numberStudent: [null, Validators.required],
      obsStudent: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const body = {
      data: {
        Name: this.studentForm.get('nameStudent')?.value,
        LastName: this.studentForm.get('sobreStudent')?.value,
        Email: this.studentForm.get('emailStudent')?.value,
        Phone: this.studentForm.get('phoneStudent')?.value,
        Birthday: this.studentForm.get('dateStudent')?.value,
        DisabledPerson: this.studentForm.get('nomeStudent')?.value,
        DisabledPersonType: this.studentForm.get('tipoPcdStudent')?.value,
        CPF: this.studentForm.get('cpfStudent')?.value,
        RG: this.studentForm.get('rgStudent')?.value,
        Gender: this.studentForm.get('genderStudent')?.value,
      },
    };

    this.http
      .post('http://localhost:1337/api/students', body)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
      });
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  sair() {
    this.bsModalRef.hide();
  }

  informacoesLoc() {
    this.inicial = false;
    this.Resp = true;
    this.scrollTop();
  }

  informacoesResp() {
    this.Resp = false;
    this.location = true;
    this.scrollTop();
  }
}
