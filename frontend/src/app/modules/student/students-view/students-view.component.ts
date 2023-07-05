import { Student } from "./../../../models/student";
import { CookieService } from "./../../../services/cookie.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ContractComponent } from "../../settings/contract/contract.component";
import { FormValidations } from "../../../shared/form-validations";
import { ChangeDetectorRef } from "@angular/core";
import * as moment from "moment";
import { HttpHeaders } from "@angular/common/http";
import { DataSharingService } from "../../../services/data-sharing.service";

@Component({
  selector: "app-students-view",
  templateUrl: "./students-view.component.html",
  styleUrls: ["./students-view.component.scss"],
})
export class StudentsViewComponent implements OnInit {
  error: any | undefined;
  students$: Observable<Student[]> | undefined;
  public onClose: Subject<boolean>;
  public inicial = true;
  public student: Student;
  public loading: boolean = false;
  public studentForm: FormGroup;
  public hasGuardian: boolean = true;
  public valid: boolean = false;
  public edit = false;
  public guardian = false;
  public isFormValid = false;
  public showAlert: boolean;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public file: File;
  public canEdit: boolean = false;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) {}

  verificarIdade(dataEscolhida: string): boolean {
    const hoje = moment();
    const dataNascimento = moment(dataEscolhida);
    const idade = hoje.diff(dataNascimento, "years");
    return idade >= 18;
  }

  headers() {
    const jwt = this.cookieService.getCookie("jwt") || "";
    const isTokenValid = this.cookieService.isTokenValid(jwt);
    if (!isTokenValid) {
      console.log("erro");
    }
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  onImageSelected(event: any) {
    this.file = event.target.files[0];
    const previewImage = document.getElementById("preview-image");
    const imageUrl = URL.createObjectURL(this.file);
    previewImage?.setAttribute("src", imageUrl);
    this.canEdit = true;
  }

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
    this.studentForm
      .get("disabledPersonStudent")
      ?.valueChanges.subscribe((pcdValue: string) => {
        if (this.studentForm.get("disabledPersonTypeStudent") != null) {
          if (pcdValue == "true") {
            this.studentForm
              .get("disabledPersonTypeStudent")
              ?.setValidators(Validators.required);
          } else {
            this.studentForm
              .get("disabledPersonTypeStudent")
              ?.clearValidators();
          }

          this.studentForm
            .get("disabledPersonTypeStudent")
            ?.updateValueAndValidity();
          this.studentForm.updateValueAndValidity();
        }
      });
    this.cdr.detectChanges();
    this.studentForm.updateValueAndValidity();
    this.studentForm.statusChanges.subscribe(() => {
      this.isFormValid = this.studentForm.valid;
    });
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie("jwt");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwt}`);
    return headers;
  }

  onEdit($student: Student): void {
    const student: Student = new Student();
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    this.loading = true;

    student.Name = this.studentForm.get("nameStudent")?.value;
    student.Email = this.studentForm.get("emailStudent")?.value;
    student.Phone = this.studentForm.get("phoneStudent")?.value;
    student.Birthday = this.studentForm.get("birthdayStudent")?.value;
    student.DisabledPerson = this.studentForm.get(
      "disabledPersonStudent"
    )?.value;
    student.DisabledPersonType = this.studentForm.get(
      "disabledPersonTypeStudent"
    )?.value;
    student.CPF = this.studentForm.get("cpfStudent")?.value;
    student.RG = this.studentForm.get("rgStudent")?.value;
    student.Gender = this.studentForm.get("genderStudent")?.value;
    student.Address = this.studentForm.get("addressStudent")?.value;
    student.LegalGuardianCPF = this.studentForm.get("cpfLegalGuardian")?.value;
    student.LegalGuardianName =
      this.studentForm.get("nameLegalGuardian")?.value;
    student.LegalGuardianEmail =
      this.studentForm.get("emailLegalGuardian")?.value;
    student.LegalGuardianRG = this.studentForm.get("rgLegalGuardian")?.value;
    student.LegalGuardianPhone =
      this.studentForm.get("phoneLegalGuardian")?.value;

    if (this.file) {
      const getFieldsFromImageSelected = new FormData();
      const headers = this.getHeaders();
      const requestOptions = { headers };
      getFieldsFromImageSelected.append("files", this.file);
      student.ProfilePicture = getFieldsFromImageSelected;

      this.http
        .post(`${baseUrl}/api/upload/`, getFieldsFromImageSelected)
        .subscribe(
          (response: any) => {
            const image = response[0];
            student.ProfilePicture = image || "/";
            const body = {
              data: student,
            };

            this.http
              .put(
                `https://20231-familymusicsystem-production.up.railway.app/api/students/${$student.id}`,
                body,
                this.headers()
              )
              .subscribe(
                (response) => {
                  console.log(response);
                  this.dataSharingService.ifshowAlertEdit = true;
                  this.bsModalRef.hide();
                },
                (error) => {
                  this.handleError(error);
                }
              );
          },
          (error) => {
            this.handleError(error);
          }
        );
    } else {
      const body = {
        data: student,
      };
      this.http
        .put(
          `https://20231-familymusicsystem-production.up.railway.app/api/students/${$student.id}`,
          body,
          this.headers()
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.dataSharingService.ifshowAlertEdit = true;
            this.bsModalRef.hide();
          },
          (error) => {
            this.handleError(error);
          }
        );
    }
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
      class: "modal-lg",
    };
    this.bsModalRef = this.modalService.show(ContractComponent, modalConfig);
    this.bsModalRef.onHide?.subscribe(() => {});
  }

  viewcontract(student: Student) {
    setTimeout(() => {
      this.modalcontract(student);
    }, 300);
    this.bsModalRef.hide();
  }

  scrollTop() {
    const div = document.getElementById("scroll");
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  transformFirstLetterToUppercase(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (value.length > 0) {
      const firstLetter = value.charAt(0).toUpperCase();
      inputElement.value = firstLetter + value.slice(1);
    }
  }

  Guardian() {
    this.hasGuardian = this.verificarIdade(
      this.studentForm.get("birthdayStudent")?.value
    );
    if (this.hasGuardian) {
      this.studentForm = this.fb.group({
        nameStudent: [
          {
            value: this.studentForm.get("nameStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        emailStudent: [
          {
            value: this.studentForm.get("emailStudent")?.value,
            disabled: false,
          },
          [Validators.required, Validators.email],
        ],
        phoneStudent: [
          {
            value: this.studentForm.get("phoneStudent")?.value,
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
            value: this.studentForm.get("cpfStudent")?.value,
            disabled: false,
          },
          [Validators.required, FormValidations.isValidCPF],
          ,
        ],
        rgStudent: [
          {
            value: this.studentForm.get("rgStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        disabledPersonStudent: [
          {
            value: this.studentForm.get("disabledPersonStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        disabledPersonTypeStudent: [
          {
            value: this.studentForm.get("disabledPersonStudentType")?.value,
            disabled: false,
          },
        ],
        genderStudent: [
          {
            value: this.studentForm.get("genderStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        addressStudent: [
          {
            value: this.studentForm.get("addressStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        birthdayStudent: [
          {
            value: this.studentForm.get("birthdayStudent")?.value,
            disabled: false,
          },
          Validators.required,
        ],
        nameLegalGuardian: [
          { value: this.studentForm.get("nameStudent")?.value, disabled: true },
          Validators.required,
        ],
        emailLegalGuardian: [
          {
            value: this.studentForm.get("emailStudent")?.value,
            disabled: true,
          },
          [Validators.required, Validators.email],
        ],
        phoneLegalGuardian: [
          {
            value: this.studentForm.get("phoneStudent")?.value,
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
          { value: this.studentForm.get("cpfStudent")?.value, disabled: true },
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
          ,
        ],
        rgLegalGuardian: [
          { value: this.studentForm.get("rgStudent")?.value, disabled: true },
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
