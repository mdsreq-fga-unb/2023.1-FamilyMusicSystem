import { CookieService } from "./../../../services/cookie.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Student } from "../../../models/student";
import * as moment from "moment";
import { FormValidations } from "../../../shared/form-validations";
import { DataSharingService } from "../../../services/data-sharing.service";

@Component({
  selector: "app-students-register",
  templateUrl: "./students-register.component.html",
  styleUrls: ["./students-register.component.scss"],
})
export class StudentsRegisterComponent implements OnInit {
  public student: Student;
  public studentForm: FormGroup;
  public guardian = false;
  public guardianForm: FormGroup;
  public studentValid: boolean = false;
  public guardianValid: boolean = false;
  public hasGuardian: boolean = true;
  public showAlert: boolean = false;
  public onClose: Subject<boolean>;
  public edicao = false;
  public nome: string;
  public inicial = true;
  public dataAtual: string;
  public loading: boolean = false;
  public file: File;

  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) {
    this.dataAtual = new Date().toISOString().split("T")[0];
  }

  verificarIdade(dataEscolhida: string): boolean {
    const hoje = moment();
    const dataNascimento = moment(dataEscolhida);
    const idade = hoje.diff(dataNascimento, "years");
    return idade >= 18;
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie("jwt");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwt}`);
    return headers;
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
      profilePicture: [null],
    });

    this.guardianForm = this.fb.group({
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
  }

  onImageSelected(event: any) {
    this.file = event.target.files[0];
    const previewImage = document.getElementById("preview-image");
    const imageUrl = URL.createObjectURL(this.file);
    previewImage?.setAttribute("src", imageUrl);
  }

  onSubmit(): void {
    const student: Student = new Student();
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const getFieldsFromImageSelected = new FormData();
    const headers = this.getHeaders();
    const requestOptions = { headers };
    this.loading = true;

    getFieldsFromImageSelected.append("files", this.file);
    student.ProfilePicture = getFieldsFromImageSelected;
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
              .post(`${baseUrl}/api/students/`, body, requestOptions)
              .subscribe(
                () => {
                  this.dataSharingService.ifshowAlertAdd = true;
                  this.showAlert = true;

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
      student.ProfilePicture = null;
      const body = {
        data: student,
      };
      this.http
        .post(`${baseUrl}/api/students/`, body, requestOptions)
        .subscribe(
          () => {
            this.dataSharingService.ifshowAlertAdd = true;
            this.showAlert = true;
            this.bsModalRef.hide();
          },
          (error) => {
            this.handleError(error);
          }
        );
    }
  }

  scrollTop() {
    const div = document.getElementById("scroll");
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  transformFirstLetterToUppercase(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (value.length > 0) {
      const words = value.toLowerCase().split(" ");
      const excludedWords = ["de", "des", "do", "dos", "das", "da", "e"];
      const result = words.map((word, index) => {
        if (index === 0 || !excludedWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      });
      inputElement.value = result.join(" ");
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
        ],
        cpfStudent: [
          {
            value: this.studentForm.get("cpfStudent")?.value,
            disabled: false,
          },
          [Validators.required, FormValidations.isValidCPF],
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
        ],
        cpfLegalGuardian: [
          { value: this.studentForm.get("cpfStudent")?.value, disabled: true },
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
        ],
        rgLegalGuardian: [
          { value: this.studentForm.get("rgStudent")?.value, disabled: true },
          Validators.required,
        ],
      });
      this.studentForm.updateValueAndValidity();
      this.studentValid = this.studentForm.valid;
      this.onSubmit();
    } else {
      this.inicial = false;
      this.guardian = true;
    }
  }

  GuardianBack() {
    this.inicial = true;
    this.guardian = false;
  }

  sair() {
    this.bsModalRef.hide();
  }
}
