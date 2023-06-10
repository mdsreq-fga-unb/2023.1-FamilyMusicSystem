import { FormValidations } from './form-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../../../models/student';
import { StudentsAlertComponent } from '../students-alert/students-alert.component';
import * as moment from 'moment';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { tap, timeout } from 'rxjs/operators';


@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.scss'],
})
export class StudentsRegisterComponent implements OnInit {
  showAlert = false;
  public onClose: Subject<boolean>;
  public edicao = false;
  public inicial = true;
  public guardian = false;
  public student: Student;
  public studentForm: FormGroup;
  public hasGuardian: boolean = true;
  public valid: boolean = false;
  dataAtual: string;


  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: BsModalRef,
  ) {
    this.dataAtual = new Date().toISOString().split('T')[0];
  }

  verificarIdade(dataEscolhida: string): boolean {
    const hoje = moment();
    const dataNascimento = moment(dataEscolhida);
    const idade = hoje.diff(dataNascimento, 'years');
    return idade >= 18;
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      nameStudent: [null, Validators.required],
      emailStudent: [null, [Validators.required, Validators.email]],
      phoneStudent: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      cpfStudent: [null, [Validators.required, FormValidations.isValidCPF]],
      rgStudent: [null, Validators.required],
      disabledPersonStudent: [null, Validators.required],
      disabledPersonTypeStudent: [null],
      genderStudent: [null, Validators.required],
      addressStudent: [null, Validators.required],
      birthdayStudent: [null, [Validators.required]],
      nameLegalGuardian: [null, Validators.required],
      emailLegalGuardian: [null, [Validators.required, Validators.email]],
      phoneLegalGuardian: [
        null,
        [Validators.required, FormValidations.isValidCPF],
      ],
      cpfLegalGuardian: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
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

    this.http
      .post(
        'https://20231-familymusicsystem-production.up.railway.app/api/students',
        body
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
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

  Guardian() {
    this.hasGuardian = this.verificarIdade(
      this.studentForm.get('birthdayStudent')?.value
    );
    if (this.hasGuardian) {
      this.studentForm = this.fb.group({
        nameStudent: [
          {
            value: this.studentForm.get('nameStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        emailStudent: [
          {
            value: this.studentForm.get('emailStudent')?.value,
            disabled: false,
          },
          [Validators.required, Validators.email],
        ],
        phoneStudent: [
          {
            value: this.studentForm.get('phoneStudent')?.value,
            disabled: false,
          },
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
          ,
        ],
        cpfStudent: [
          {
            value: this.studentForm.get('cpfStudent')?.value,
            disabled: false,
          },
          [Validators.required, FormValidations.isValidCPF],
          ,
        ],
        rgStudent: [
          {
            value: this.studentForm.get('rgStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        disabledPersonStudent: [
          {
            value: this.studentForm.get('disabledPersonStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        disabledPersonTypeStudent: [
          {
            value: this.studentForm.get('disabledPersonStudentType')?.value,
            disabled: false,
          },
        ],
        genderStudent: [
          {
            value: this.studentForm.get('genderStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        addressStudent: [
          {
            value: this.studentForm.get('addressStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        birthdayStudent: [
          {
            value: this.studentForm.get('birthdayStudent')?.value,
            disabled: false,
          },
          Validators.required,
        ],
        nameLegalGuardian: [
          { value: this.studentForm.get('nameStudent')?.value, disabled: true },
          Validators.required,
        ],
        emailLegalGuardian: [
          {
            value: this.studentForm.get('emailStudent')?.value,
            disabled: true,
          },
          [Validators.required, Validators.email],
        ],
        phoneLegalGuardian: [
          {
            value: this.studentForm.get('phoneStudent')?.value,
            disabled: true,
          },
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
          ,
        ],
        cpfLegalGuardian: [
          { value: this.studentForm.get('cpfStudent')?.value, disabled: true },
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
          ,
        ],
        rgLegalGuardian: [
          { value: this.studentForm.get('rgStudent')?.value, disabled: true },
          Validators.required,
        ],
      });
    }
    this.studentForm.updateValueAndValidity();
    this.valid = this.studentForm.valid;
    this.inicial = false;
    this.guardian = true;
  }

  GuardianBack() {
    this.inicial = true;
    this.guardian = false;
  }

  sair() {
    this.bsModalRef.hide();
  }

  salvar() {
    this.bsModalRef.hide();
    this.onSubmit();
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
