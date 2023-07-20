import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Mural } from "../../../models/mural";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MuralRegisterComponent } from "../mural-register/mural-register.component";
import { MuralFilterComponent } from "../mural-filter/mural-filter.component";
import { MuralViewComponent } from "../mural-view/mural-view.component";
import { CookieService } from "../../../services/cookie.service";
import { ConfirmationComponent } from "../../../shared/confirmation/confirmation.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DataSharingService } from "../../../services/data-sharing.service";

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Mural>[];
}

@Component({
  selector: "app-mural-list",
  templateUrl: "./mural-list.component.html",
  styleUrls: ["./mural-list.component.scss"],
})
export class MuralListComponent implements OnInit {
  public loading = true;
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public mural: Mural[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public mural$: Observable<Mural[]> | undefined;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public prefixoUrlMural =
    "https://20231-familymusicsystem-production.up.railway.app/api/murals";

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
    console.log(jwt);

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  getMural(args?: string) {
    this.loading = true; // Define o estado de loading como true antes de fazer a requisição

    this.mural$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlMural}${args}` : this.prefixoUrlMural,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((mural) => {
            mural.attributes.id = mural.id;
          });
        }),
        map((response: Response) =>
          response.data.map((mural) => mural.attributes)
        )
      );

    this.mural$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  search() {
    this.getMural(
      `?filters[Title][$startsWithi][0]=${this.searchForm.get("search")?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie("jwt");
    this.getMural();
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  modalAddMural() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-md",
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      MuralRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertAdd) {
        this.getMural();
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
          this.dataSharingService.ifshowAlertAdd = false;
        }, 3000);
      }
    });
  }

  modalEditMural(mural: Mural, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-md",
      initialState: {
        mural: mural,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(MuralViewComponent, modalConfig);
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertEdit) {
        this.getMural();
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          this.dataSharingService.ifshowAlertEdit = false;
        }, 3000);
      }
    });
  }

  deleteMural(mural: Mural) {
    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(
      ConfirmationComponent,
      {
        data: {
          message: "Deseja realmente excluir esse aviso?",
          dialogRef: null,
        },
      }
    );

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlMural}/${mural.id}`, this.headers())
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getMural();
            this.showAlertDelete = true;
            setTimeout(() => {
              this.showAlertDelete = false;
            }, 3000);
          });
      }
    });
  }

  modalFilterMural() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: "modal-md",
    };
    this.bsModalRef = this.modalService.show(MuralFilterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe((url: string) => {
      this.getMural(url);
    });
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
