import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContractComponent } from '../../settings/contract/contract.component';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss'],
})
export class StudentsViewComponent implements OnInit {
  error: any | undefined;
  students$: Observable<Student[]> | undefined;
  public onClose: Subject<boolean>;
  public inicial = true;
  public student: Student;
  public studentForm: FormGroup;
  public edit = false;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    if (this.edit) {
      this.studentForm = this.fb.group({
        nameStudent: [
          { value: this.student.Name, disabled: false },
          Validators.required,
        ],
        emailStudent: [
          { value: this.student.Email, disabled: false },
          Validators.required,
        ],
        phoneStudent: [
          { value: this.student.Phone, disabled: false },
          Validators.required,
        ],
        cpfStudent: [
          { value: this.student.CPF, disabled: false },
          Validators.required,
        ],
        rgStudent: [
          { value: this.student.RG, disabled: false },
          Validators.required,
        ],
        disabledPersonStudent: [
          { value: this.student.DisabledPerson, disabled: false },
          Validators.required,
        ],
        disabledPersonTypeStudent: [
          { value: this.student.DisabledPersonType, disabled: false },
          Validators.required,
        ],
        genderStudent: [
          { value: this.student.Gender, disabled: false },
          Validators.required,
        ],
        addressStudent: [
          { value: this.student.Address, disabled: false },
          Validators.required,
        ],
        birthdayStudent: [
          { value: this.student.Birthday, disabled: false },
          Validators.required,
        ],
        nameLegalGuardian: [
          { value: this.student.LegalGuardianName, disabled: false },
          Validators.required,
        ],
        emailLegalGuardian: [
          { value: this.student.LegalGuardianEmail, disabled: false },
          Validators.required,
        ],
        phoneLegalGuardian: [
          { value: this.student.LegalGuardianPhone, disabled: false },
          Validators.required,
        ],
        cpfLegalGuardian: [
          { value: this.student.LegalGuardianCPF, disabled: false },
          Validators.required,
        ],
        rgLegalGuardian: [
          { value: this.student.LegalGuardianRG, disabled: false },
          Validators.required,
        ],
      });
    } else {
      this.studentForm = this.fb.group({
        nameStudent: [
          { value: this.student.Name, disabled: true },
          Validators.required,
        ],
        emailStudent: [
          { value: this.student.Email, disabled: true },
          Validators.required,
        ],
        phoneStudent: [
          { value: this.student.Phone, disabled: true },
          Validators.required,
        ],
        cpfStudent: [
          { value: this.student.CPF, disabled: true },
          Validators.required,
        ],
        rgStudent: [
          { value: this.student.RG, disabled: true },
          Validators.required,
        ],
        disabledPersonStudent: [
          { value: this.student.DisabledPerson, disabled: true },
          Validators.required,
        ],
        disabledPersonTypeStudent: [
          { value: this.student.DisabledPersonType, disabled: true },
          Validators.required,
        ],
        genderStudent: [
          { value: this.student.Gender, disabled: true },
          Validators.required,
        ],
        addressStudent: [
          { value: this.student.Address, disabled: true },
          Validators.required,
        ],
        birthdayStudent: [
          { value: this.student.Birthday, disabled: true },
          Validators.required,
        ],
        nameLegalGuardian: [
          { value: this.student.LegalGuardianName, disabled: true },
          Validators.required,
        ],
        emailLegalGuardian: [
          { value: this.student.LegalGuardianEmail, disabled: true },
          Validators.required,
        ],
        phoneLegalGuardian: [
          { value: this.student.LegalGuardianPhone, disabled: true },
          Validators.required,
        ],
        cpfLegalGuardian: [
          { value: this.student.LegalGuardianCPF, disabled: true },
          Validators.required,
        ],
        rgLegalGuardian: [
          { value: this.student.LegalGuardianRG, disabled: true },
          Validators.required,
        ],
      });
    }
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
      .put(`http://localhost:1337/api/students/${this.student.id}`, body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  modalcontract() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ContractComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
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
