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
import { FormValidations } from "../../../shared/form-validations";
import { DataSharingService } from "../../../services/data-sharing.service";
import { Room } from "../../../models/room";

@Component({
  selector: "app-room-register",
  templateUrl: "./room-register.component.html",
  styleUrls: ["./room-register.component.scss"],
})
export class RoomRegisterComponent implements OnInit {
  public room: Room;
  public roomForm: FormGroup;
  public roomValid: boolean = false;
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
    this.roomForm = this.fb.group({
      numberRoom: [null, Validators.required],
      nameRoom: [null, Validators.required],
      descriptionRoom: [null],
      capacityRoom: [
        null,
        [Validators.required, FormValidations.isValidCapacity],
      ],
    });
  }

  onSubmit(): void {
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const room: Room = new Room();
    const headers = this.getHeaders();
    const requestOptions = { headers };

    room.Name = this.roomForm.get("nameRoom")?.value;
    room.Number = this.roomForm.get("numberRoom")?.value.toString();
    room.Description = this.roomForm.get("descriptionRoom")?.value;
    room.Capacity = this.roomForm.get("capacityRoom")?.value;

    const body = {
      data: room,
    };
    this.http.post(`${baseUrl}/api/rooms/`, body, requestOptions).subscribe(
      () => {
        this.dataSharingService.ifshowAlertAdd = true;
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
