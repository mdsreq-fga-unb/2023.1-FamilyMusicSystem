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
      addressStudent: [null, Validators.required],
      birthdayStudent: [null, Validators.required],
      nameLegalGuardian: [null, Validators.required],
      emailLegalGuardian: [null, Validators.required],
      phoneLegalGuardian: [null, Validators.required],
      cpfLegalGuardian: [null, Validators.required],
      rgLegalGuardian: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const student: Student = new Student();
    student.Name = this.studentForm.get('nameStudent')?.value;
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
    student.Address = this.studentForm.get('addressStudent')?.value;
    student.LegalGuardianCPF = this.studentForm.get('cpfLegalGuardian')?.value;
    student.LegalGuardianName =
      this.studentForm.get('nameLegalGuardian')?.value;
    student.LegalGuardianEmail =
      this.studentForm.get('emailLegalGuardian')?.value;
    student.LegalGuardianRG = this.studentForm.get('rgLegalGuardian')?.value;
    student.LegalGuardianPhone =
      this.studentForm.get('phoneLegalGuardian')?.value;

    const body = {
      data: student,
    };

    this.http.post('http://localhost:1337/api/students', body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.handleError(error);
      }
    );
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
}
