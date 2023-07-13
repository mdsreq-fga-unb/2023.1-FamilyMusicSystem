import { Mural } from '../../../models/mural';
import { CookieService } from '../../../services/cookie.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormValidations } from '../../../shared/form-validations';
import { DataSharingService } from '../../../services/data-sharing.service';

@Component({
  selector: 'app-mural-view',
  templateUrl: './mural-view.component.html',
  styleUrls: ['./mural-view.component.scss'],
})
export class MuralViewComponent {
  public mural: Mural;
  mural$: Observable<Mural[]> | undefined;
  public muralForm: FormGroup;
  public muralValid: boolean = false;
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
    this.dataAtual = new Date().toISOString().split('T')[0];
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return headers;
  }

  headers() {
    const jwt = this.cookieService.getCookie('jwt') || '';
    const isTokenValid = this.cookieService.isTokenValid(jwt);
    if (!isTokenValid) {
      console.log('erro');
    }
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
    return opts;
  }

  ngOnInit(): void {
    this.muralForm = this.fb.group({
      titleMural: [
        { value: this.mural.Title, disabled: !this.edit },
        Validators.required,
      ],
      muralMessage: [
        { value: this.mural.Message, disabled: !this.edit },
        Validators.required,
      ],
    });
    this.cdr.detectChanges();
    this.muralForm.updateValueAndValidity();
    this.muralForm.statusChanges.subscribe(() => {
      this.isFormValid = this.muralForm.valid;
    });
  }

  onEdit($mural: Mural): void {
    const mural: Mural = new Mural();
    const headers = this.getHeaders();
    const requestOptions = { headers };
    const dateNow = new Date();
    const day = dateNow.getDate().toString();
    const dayAtt = day.length == 1 ? '0' + day : day;
    const month = (dateNow.getMonth() + 1).toString();
    const monthAtt = month.length == 1 ? '0' + month : month;
    const yearAtt = dateNow.getFullYear();
    const hours = dateNow.getHours().toString();
    const hoursAtt = hours.length == 1 ? '0' + hours : hours;
    const minutes = dateNow.getMinutes().toString();
    const minutesAtt = minutes.length == 1 ? '0' + minutes : minutes;

    mural.Title = this.muralForm.get('titleMural')?.value.toString();
    mural.Message = this.muralForm.get('muralMessage')?.value.toString();
    mural.Date =
      dayAtt +
      '/' +
      monthAtt +
      '/' +
      yearAtt +
      ' - ' +
      hoursAtt +
      ':' +
      minutesAtt;

    const body = {
      data: mural,
    };

    this.http
      .put(
        `https://20231-familymusicsystem-production.up.railway.app/api/murals/${$mural.id}`,
        body,
        this.headers()
      )
      .subscribe(
        () => {
          this.dataSharingService.ifshowAlertEdit = true;
          this.showAlert = true;
          this.loading = true;
          this.bsModalRef.hide();
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  transformFirstLetterToUppercase(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (value.length > 0) {
      const words = value.toLowerCase().split(' ');
      const excludedWords = ['de', 'des', 'do', 'dos', 'das', 'da', 'e'];
      const result = words.map((word, index) => {
        if (index === 0 || !excludedWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      });
      inputElement.value = result.join(' ');
    }
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
