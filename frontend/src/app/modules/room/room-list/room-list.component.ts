import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CookieService } from "../../../services/cookie.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataSharingService } from "../../../services/data-sharing.service";
import { Room } from "../../../models/room";
import { RoomFilterComponent } from "../room-filter/room-filter.component";
import { RoomRegisterComponent } from "../room-register/room-register.component";
import { RoomViewComponent } from "../room-view/room-view.component";
import { ConfirmationComponent } from "../../../shared/confirmation/confirmation.component";

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Room>[];
}

@Component({
  selector: "app-room-list",
  templateUrl: "./room-list.component.html",
  styleUrls: ["./room-list.component.scss"],
})
export class RoomListComponent implements OnInit {
  public loading = true;
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public rooms: Room[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public rooms$: Observable<Room[]> | undefined;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public prefixoUrlRoom =
    "https://20231-familymusicsystem-production.up.railway.app/api/rooms";

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dataSharingService: DataSharingService
  ) {}

  headers() {
    const jwt = this.cookieService.getCookie("jwt");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  getRoom(args?: string) {
    this.loading = true; // Define o estado de loading como true antes de fazer a requisição

    this.rooms$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlRoom}${args}` : this.prefixoUrlRoom,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((room) => {
            room.attributes.id = room.id;
          });
        }),
        map((response: Response) =>
          response.data.map((room) => room.attributes)
        )
      );

    this.rooms$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  search() {
    this.getRoom(
      `?filters[name][$startsWithi][0]=${this.searchForm.get("search")?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie("jwt");
    this.getRoom();
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  modalAddSala() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-lg",
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      RoomRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertAdd) {
        this.getRoom();
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
          this.dataSharingService.ifshowAlertAdd = false;
        }, 3000);
      }
    });
  }

  modalEditSala(room: Room, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-lg",
      initialState: {
        room: room,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(RoomViewComponent, modalConfig);
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertEdit) {
        this.getRoom();
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          this.dataSharingService.ifshowAlertEdit = false;
        }, 3000);
      }
    });
  }

  deleteRoom(room: Room) {
    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(
      ConfirmationComponent,
      {
        data: {
          message: "Deseja realmente excluir essa sala?",
          dialogRef: null,
        },
      }
    );

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlRoom}/${room.id}`, this.headers())
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getRoom();
            this.showAlertDelete = true;
            setTimeout(() => {
              this.showAlertDelete = false;
            }, 3000);
          });
      }
    });
  }

  modalFilterSala() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: "modal-md",
    };
    this.bsModalRef = this.modalService.show(RoomFilterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe((url: string) => {
      this.getRoom(url);
    });
  }

  exibirString(string: string): string {
    if (string.length <= 20) {
      return string;
    } else {
      return string.substring(0, 20) + "...";
    }
  }

  toggle() {
    this.estilosDinamicos = {
      background: this.calcularCorDeFundo(),
    };
  }

  calcularCorDeFundo() {
    return "var(--selector)";
  }
}
