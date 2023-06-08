import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContractComponent } from '../../settings/contract/contract.component';
import { StudentsAlertComponent } from '../students-alert/students-alert.component';

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
  public guardian = false;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: BsModalService,
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
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
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
        Validators.required,
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
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
        ,
      ],
      rgLegalGuardian: [
        { value: this.student.LegalGuardianRG, disabled: !this.edit },
        Validators.required,
      ],
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

    this.http.post('http://localhost:1337/api/students', body).subscribe(
      (response) => {
        console.log(response);
        this.showAlertModal();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  showAlertModal() {
    const successModalRef = this.modalService.show(StudentsAlertComponent, {
      initialState: {
        title: 'Operação concluída com sucesso!',
        message: 'A operação foi realizada com sucesso.',
      },
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
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

  Guardian() {
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
}
