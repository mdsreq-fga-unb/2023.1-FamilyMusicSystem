import { Room } from "./../../../models/room";
import { CookieService } from "./../../../services/cookie.service";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-room-view",
  templateUrl: "./room-view.component.html",
  styleUrls: ["./room-view.component.scss"],
})
export class RoomViewComponent implements OnInit {
  public room: Room;
  room$: Observable<Room[]> | undefined;
  public roomForm: FormGroup;
  public roomValid: boolean = false;
  public showAlert: boolean = false;
  public onClose: Subject<boolean>;
  public edicao = false;
  public nome: string;
  public edit = false;
  public inicial = true;
  public isFormValid = false;
  public dataAtual: string;
  public loading: boolean = false;
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

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      numberRoom: [
        { value: this.room.Number, disabled: !this.edit },
        Validators.required,
      ],
      nameRoom: [
        { value: this.room.Name, disabled: !this.edit },
        Validators.required,
      ],
      descriptionRoom: [{ value: this.room.Description, disabled: !this.edit }],
      capacityRoom: [
        { value: this.room.Capacity, disabled: !this.edit },
        [Validators.required, FormValidations.isValidCapacity],
      ],
    });
    this.cdr.detectChanges();
    this.roomForm.updateValueAndValidity();
    this.roomForm.statusChanges.subscribe(() => {
      this.isFormValid = this.roomForm.valid;
    });
  }

  onEdit($room: Room): void {
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

    this.http
      .put(
        `https://20231-familymusicsystem-production.up.railway.app/api/rooms/${$room.id}`,
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
}
