import { Teacher } from "./../../../models/teacher";
import { CookieService } from "./../../../services/cookie.service";
import { FormValidations } from "./../../../shared/form-validations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ContractComponent } from "../../settings/contract/contract.component";
import { ChangeDetectorRef } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { DataSharingService } from "../../../services/data-sharing.service";

@Component({
  selector: "app-teachers-view",
  templateUrl: "./teachers-view.component.html",
  styleUrls: ["./teachers-view.component.scss"],
})
export class TeachersViewComponent implements OnInit {
  public teacher: Teacher;
  teachers$: Observable<Teacher[]> | undefined;
  public teacherForm: FormGroup;
  public teacherValid: boolean = false;
  public showAlert: boolean = false;
  public onClose: Subject<boolean>;
  public edicao = false;
  public nome: string;
  public edit = false;
  public inicial = true;
  public isFormValid = false;
  public dataAtual: string;
  public loading: boolean = false;
  public file: File;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public canEdit: boolean = false;

  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) {
    this.dataAtual = new Date().toISOString().split("T")[0];
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie("jwt");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwt}`);
    return headers;
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
    this.teacherForm = this.fb.group({
      nameTeacher: [
        { value: this.teacher.Name, disabled: !this.edit },
        Validators.required,
      ],
      emailTeacher: [
        { value: this.teacher.Email, disabled: !this.edit },
        [Validators.required, Validators.email],
      ],
      phoneTeacher: [
        { value: this.teacher.Phone, disabled: !this.edit },
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
        ,
      ],
      cpfTeacher: [
        { value: this.teacher.CPF, disabled: !this.edit },
        [Validators.required, FormValidations.isValidCPF],
        ,
      ],
      rgTeacher: [
        { value: this.teacher.RG, disabled: !this.edit },
        Validators.required,
      ],

      genderTeacher: [
        { value: this.teacher.Gender, disabled: !this.edit },
        Validators.required,
      ],

      instrumentTeacher: [
        { value: this.teacher.Instruments, disabled: !this.edit },
        Validators.required,
      ],
    });
    this.cdr.detectChanges();
    this.teacherForm.updateValueAndValidity();
    this.teacherForm.statusChanges.subscribe(() => {
      this.isFormValid = this.teacherForm.valid;
    });
  }

  onEdit($teacher: Teacher): void {
    const teacher: Teacher = new Teacher();
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    this.loading = true;

    teacher.Name = this.teacherForm.get("nameTeacher")?.value;
    teacher.Email = this.teacherForm.get("emailTeacher")?.value;
    teacher.Phone = this.teacherForm.get("phoneTeacher")?.value;
    teacher.CPF = this.teacherForm.get("cpfTeacher")?.value;
    teacher.RG = this.teacherForm.get("rgTeacher")?.value;
    teacher.Gender = this.teacherForm.get("genderTeacher")?.value;
    teacher.Instruments = this.teacherForm.get("instrumentTeacher")?.value;

    if (this.file) {
      const getFieldsFromImageSelected = new FormData();
      const headers = this.getHeaders();
      const requestOptions = { headers };
      getFieldsFromImageSelected.append("files", this.file);
      teacher.ProfilePicture = getFieldsFromImageSelected;

      this.http
        .post(`${baseUrl}/api/upload/`, getFieldsFromImageSelected)
        .subscribe(
          (response: any) => {
            const image = response[0];
            teacher.ProfilePicture = image || "/";
            const body = {
              data: teacher,
            };

            this.http
              .put(
                `https://20231-familymusicsystem-production.up.railway.app/api/teachers/${$teacher.id}`,
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
        data: teacher,
      };
      this.http
        .put(
          `https://20231-familymusicsystem-production.up.railway.app/api/teachers/${$teacher.id}`,
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

  sair() {
    this.bsModalRef.hide();
  }
}
