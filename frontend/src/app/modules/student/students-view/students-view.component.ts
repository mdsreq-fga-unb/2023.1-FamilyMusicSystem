import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContractComponent } from '../../settings/contract/contract.component';
import { StudentsAlertComponent } from '../students-alert/students-alert.component';
import { FormValidations } from '../../../shared/form-validations';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss'],
})
export class StudentsViewComponent implements OnInit {
  showAlert = false;
  error: any | undefined;
  students$: Observable<Student[]> | undefined;
  public onClose: Subject<boolean>;
  public inicial = true;
  public student: Student;
  public studentForm: FormGroup;
  public hasGuardian: boolean = true;
  public valid: boolean = false;
  public edit = false;
  public guardian = false;
  public isFormValid = false;

  verificarIdade(dataEscolhida: string): boolean {
    const hoje = moment();
    const dataNascimento = moment(dataEscolhida);
    const idade = hoje.diff(dataNascimento, 'years');
    return idade >= 18;
  }

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
    private dialogRef: BsModalRef,
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      nameStudent: [
        { value: this.student.Name, disabled: !this.edit },
        Validators.required,
      ],
      emailStudent: [
        { value: this.student.Email, disabled: !this.edit },
        [Validators.required, Validators.email],
      ],
      phoneStudent: [
        { value: this.student.Phone, disabled: !this.edit },
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
        ,
      ],
      cpfStudent: [
        { value: this.student.CPF, disabled: !this.edit },
        [Validators.required, FormValidations.isValidCPF],
        ,
      ],
      rgStudent: [
        { value: this.student.RG, disabled: !this.edit },
        Validators.required,
      ],
      disabledPersonStudent: [
        { value: this.student.DisabledPerson, disabled: !this.edit },
        Validators.required,
      ],
      disabledPersonTypeStudent: [
        { value: this.student.DisabledPersonType, disabled: !this.edit },
      ],
      genderStudent: [
        { value: this.student.Gender, disabled: !this.edit },
        Validators.required,
      ],
      addressStudent: [
        { value: this.student.Address, disabled: !this.edit },
        Validators.required,
      ],
      birthdayStudent: [
        { value: this.student.Birthday, disabled: !this.edit },
        Validators.required,
      ],
      nameLegalGuardian: [
        { value: this.student.LegalGuardianName, disabled: !this.edit },
        Validators.required,
      ],
      emailLegalGuardian: [
        { value: this.student.LegalGuardianEmail, disabled: !this.edit },
        [Validators.required, Validators.email],
      ],
      phoneLegalGuardian: [
        { value: this.student.LegalGuardianPhone, disabled: !this.edit },
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
        ,
      ],
      cpfLegalGuardian: [
        { value: this.student.LegalGuardianCPF, disabled: !this.edit },
        [Validators.required, FormValidations.isValidCPF],
        ,
      ],
      rgLegalGuardian: [
        { value: this.student.LegalGuardianRG, disabled: !this.edit },
        Validators.required,
      ],
    });
    this.cdr.detectChanges();
    this.studentForm.updateValueAndValidity();
    this.studentForm.statusChanges.subscribe(() => {
      this.isFormValid = this.studentForm.valid;
    });
  }

  onEdit(): void {
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
      .put(
        `https://20231-familymusicsystem-production.up.railway.app/api/students/${student.id}`,
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

  modalcontract(student: Student) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        student: student,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ContractComponent, modalConfig);
    this.bsModalRef.onHide?.subscribe(() => {});
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
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
    this.inicial = false;
    this.guardian = true;
    this.cdr.detectChanges();
    this.studentForm.updateValueAndValidity();
    this.studentForm.statusChanges.subscribe(() => {
      this.isFormValid = this.studentForm.valid;
    });
  }
  GuardianBack() {
    this.inicial = true;
    this.guardian = false;
  }

  sair() {
    this.bsModalRef.hide();
  }
}
