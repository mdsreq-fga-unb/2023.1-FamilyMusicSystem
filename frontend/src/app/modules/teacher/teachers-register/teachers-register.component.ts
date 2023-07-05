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
import { Teacher } from "../../../models/teacher";
import * as moment from "moment";
import { FormValidations } from "../../../shared/form-validations";
import { DataSharingService } from "../../../services/data-sharing.service";

@Component({
  selector: "app-teachers-register",
  templateUrl: "./teachers-register.component.html",
  styleUrls: ["./teachers-register.component.scss"],
})
export class TeachersRegisterComponent implements OnInit {
  public teacher: Teacher;
  public teacherForm: FormGroup;
  public teacherValid: boolean = false;
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

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie("jwt");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwt}`);
    return headers;
  }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      nameTeacher: [null, Validators.required],
      emailTeacher: [null, [Validators.required, Validators.email]],
      phoneTeacher: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      cpfTeacher: [null, [Validators.required, FormValidations.isValidCPF]],
      rgTeacher: [null, Validators.required],
      genderTeacher: [null, Validators.required],
      instrumentTeacher: [null, Validators.required],
      profilePicture: [null],
    });
  }

  onImageSelected(event: any) {
    this.file = event.target.files[0];
    const previewImage = document.getElementById("preview-image");
    const imageUrl = URL.createObjectURL(this.file);
    previewImage?.setAttribute("src", imageUrl);
  }

  onSubmit(): void {
    const teacher: Teacher = new Teacher();
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const getFieldsFromImageSelected = new FormData();
    const headers = this.getHeaders();
    const requestOptions = { headers };
    this.loading = true;

    getFieldsFromImageSelected.append("files", this.file);
    teacher.ProfilePicture = getFieldsFromImageSelected;
    teacher.Name = this.teacherForm.get("nameTeacher")?.value;
    teacher.Email = this.teacherForm.get("emailTeacher")?.value;
    teacher.Phone = this.teacherForm.get("phoneTeacher")?.value;
    teacher.CPF = this.teacherForm.get("cpfTeacher")?.value;
    teacher.RG = this.teacherForm.get("rgTeacher")?.value;
    teacher.Gender = this.teacherForm.get("genderTeacher")?.value;
    teacher.Instruments = this.teacherForm.get("instrumentTeacher")?.value;

    if (this.file) {
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
              .post(`${baseUrl}/api/teachers/`, body, requestOptions)
              .subscribe(
                () => {
                  console.log("subscribe funcionando");
                  this.dataSharingService.ifshowAlertAdd = true;
                  this.showAlert = true;
                  console.log(this.dataSharingService.ifshowAlertAdd);

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
      teacher.ProfilePicture = null;
      const body = {
        data: teacher,
      };
      this.http
        .post(`${baseUrl}/api/teachers/`, body, requestOptions)
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

  sair() {
    this.bsModalRef.hide();
  }

  salvar() {
    this.showAlert = true;
    this.onSubmit();
  }
}
