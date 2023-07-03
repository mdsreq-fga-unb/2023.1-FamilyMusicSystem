import { CookieService } from './../../../services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Teacher } from '../../../models/teacher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormValidations } from '../../../shared/form-validations';
import { HttpHeaders } from '@angular/common/http';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-teachers-register',
  templateUrl: './teachers-register.component.html',
  styleUrls: ['./teachers-register.component.scss'],
})
export class TeachersRegisterComponent implements OnInit {
  public showAlert: boolean = false;
  public edicao = false;
  public onClose: Subject<boolean>;
  public teacher: Teacher;
  public nome : string;
  public file: File;
  public teacherForm: FormGroup;
  public dataAtual: string;

  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private dataSharingService: DataSharingService,
    private cookieService: CookieService
  ) {
    this.dataAtual = new Date().toISOString().split('T')[0];
  }

  headers() {
    const jwt = this.cookieService.getCookie('jwt');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
    return opts;
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return headers;
  }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      nameTeacher: [null, Validators.required],
      emailTeacher: [null, Validators.required, Validators.email],
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
    });
  }

  onImageSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const getFieldsFromImageSelected = new FormData();
    const headers = this.getHeaders();
    const requestOptions = { headers };

    const teacher: Teacher = new Teacher();
    getFieldsFromImageSelected.append('files', this.file);
    teacher.ProfilePicture = getFieldsFromImageSelected;
    teacher.Name = this.teacherForm.get('nameTeacher')?.value;
    teacher.Email = this.teacherForm.get('emailTeacher')?.value;
    teacher.Phone = this.teacherForm.get('phoneTeacher')?.value;
    teacher.CPF = this.teacherForm.get('cpfTeacher')?.value;
    teacher.RG = this.teacherForm.get('rgTeacher')?.value;
    teacher.Gender = this.teacherForm.get('genderTeacher')?.value;
    teacher.Instruments = this.teacherForm.get('instrumentTeacher')?.value;
    const body = {
      data: teacher,
    };

    this.http
      .post(
        'https://20231-familymusicsystem-production.up.railway.app/api/teachers',
        body,
        this.headers()
      )
      .subscribe(
        (response: any) => {
          const image = response[0];
          teacher.ProfilePicture = image || '/';

          const body = {
            data: teacher,
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
  }

  sair() {
    this.bsModalRef.hide();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  salvar() {
    this.showAlert = true;
    this.bsModalRef.hide();
    this.onSubmit();
  }

  transformFirstLetterToUppercase(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (value.length > 0) {
      const firstLetter = value.charAt(0).toUpperCase();
      inputElement.value = firstLetter + value.slice(1);
    }
  }
}
