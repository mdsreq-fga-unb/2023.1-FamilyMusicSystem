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
import { FormValidations } from "../../../shared/form-validations";
import { DataSharingService } from "../../../services/data-sharing.service";
import { Mural } from "src/app/models/mural";
import { CookieService } from "./../../../services/cookie.service";

@Component({
  selector: 'app-mural-register',
  templateUrl: './mural-register.component.html',
  styleUrls: ['./mural-register.component.scss']
})
export class MuralRegisterComponent {
  public mural: Mural;
  public muralForm: FormGroup;
  public muralValid: boolean = false;
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
    this.muralForm = this.fb.group({
      titleMural: [null, Validators.required],
      muralMessage: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const mural: Mural = new Mural();
    const headers = this.getHeaders();
    const requestOptions = { headers };

    mural.Title = this.muralForm.get("titleMural")?.value.toString();
    mural.Message = this.muralForm.get("muralMessage")?.value.toString();

    // const body = {
    //   data: mural,
    // };
    // this.http.post(`${baseUrl}/api/rooms/`, body, requestOptions).subscribe(
    //   () => {
    //     this.dataSharingService.ifshowAlertAdd = true;
    //     this.showAlert = true;
    //     this.loading = true;
    //     this.bsModalRef.hide();
    //   },
    //   (error) => {
    //     this.handleError(error);
    //   }
    // );
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

  sair() {
    this.bsModalRef.hide();
  }

  salvar() {
    this.showAlert = true;
    this.onSubmit();
  }
}
