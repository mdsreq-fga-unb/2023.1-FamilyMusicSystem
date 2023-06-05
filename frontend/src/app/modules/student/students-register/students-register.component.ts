import { Location } from 'src/app/models/location';
import { LegalGuardian } from 'src/app/models/legalguardian';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.scss'],
})
export class StudentsRegisterComponent implements OnInit {
  public onClose: Subject<boolean>;
  public edicao = false;
  public loc = false;
  public inicial = true;
  public Resp = false;
  public student: Student;
  public studentForm: FormGroup;

  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      nameStudent: [null, Validators.required],
      surnameStudent: [null, Validators.required],
      emailStudent: [null, Validators.required],
      phoneStudent: [null, Validators.required],
      cpfStudent: [null, Validators.required],
      rgStudent: [null, Validators.required],
      disabledPersonStudent: [null, Validators.required],
      disabledPersonTypeStudent: [null, Validators.required],
      genderStudent: [null, Validators.required],
      birthdayStudent: [null, Validators.required],

      nameLegalGuardian: [null, Validators.required],
      surnameLegalGuardian: [null, Validators.required],
      emailLegalGuardian: [null, Validators.required],
      phoneLegalGuardian: [null, Validators.required],
      cpfLegalGuardian: [null, Validators.required],
      rgLegalGuardian: [null, Validators.required],
      disabledPersonLegalGuardian: [null, Validators.required],
      disabledPersonTypeLegalGuardian: [null, Validators.required],
      genderLegalGuardian: [null, Validators.required],
      birthdayLegalGuardian: [null, Validators.required],

      cityStudent: [null, Validators.required],
      cepStudent: [null, Validators.required],
      stateStudent: [null, Validators.required],
      neighborhoodStudent: [null, Validators.required],
      adressStudent: [null, Validators.required],
      complementStudent: [null, Validators.required],
      numberStudent: [null, Validators.required],
      observationStudent: [null, Validators.required],
    });
  }

  // location ainda não está sendo mandada para o banco
  // LegalGuardian ainda não está vinculado com o Student

  onSubmit(): void {
    const legalGuardian: LegalGuardian = new LegalGuardian();
    legalGuardian.Name = this.studentForm.get('nameLegalGuardian')?.value;
    legalGuardian.Surname = this.studentForm.get('surnameLegalGuardian')?.value;
    legalGuardian.Email = this.studentForm.get('emailLegalGuardian')?.value;
    legalGuardian.Phone = this.studentForm.get('phoneLegalGuardian')?.value;
    legalGuardian.CPF = this.studentForm.get('cpfLegalGuardian')?.value;
    legalGuardian.RG = this.studentForm.get('rgLegalGuardian')?.value;
    legalGuardian.DisabledPerson = this.studentForm.get(
      'disabledPersonLegalGuardian'
    )?.value;
    legalGuardian.DisabledPersonType = this.studentForm.get(
      'disabledPersonTypeLegalGuardian'
    )?.value;
    legalGuardian.Gender = this.studentForm.get('genderLegalGuardian')?.value;
    legalGuardian.Birthday = this.studentForm.get(
      'birthdayLegalGuardian'
    )?.value;

    const body = {
      data: legalGuardian,
    };

    this.http
      .post('http://localhost:1337/api/legal-guardians', body)
      .pipe(
        catchError((error) => this.handleError(error)),
        switchMap((guardianResponse: any) => {
          const legalGuardianId = guardianResponse.id;

          const student: Student = new Student();
          student.Name = this.studentForm.get('nameStudent')?.value;
          student.Surname = this.studentForm.get('surnameStudent')?.value;
          student.Email = this.studentForm.get('emailStudent')?.value;
          student.Phone = this.studentForm.get('phoneStudent')?.value;
          student.Birthday = this.studentForm.get('birthdayStudent')?.value;
          student.DisabledPerson = this.studentForm.get(
            'disabledPersonStudent'
          )?.value;
          student.DisabledPersonType = this.studentForm.get(
            'disabledPersonTypeStudent'
          )?.value;
          student.CPF = this.studentForm.get('cpfStudent')?.value;
          student.RG = this.studentForm.get('rgStudent')?.value;
          student.Gender = this.studentForm.get('genderStudent')?.value;
          student.LegalGuardian = legalGuardianId;

          const body = {
            data: student,
          };

          return this.http.post('http://localhost:1337/api/students', body);
        }),
        catchError((error) => this.handleError(error))
      )
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
    this.loc = true;
    this.scrollTop();
  }
}
