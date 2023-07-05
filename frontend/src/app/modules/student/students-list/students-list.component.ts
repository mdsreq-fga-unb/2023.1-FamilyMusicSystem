import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from "./../../../models/student";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { StudentsRegisterComponent } from "../students-register/students-register.component";
import { StudentsViewComponent } from "../students-view/students-view.component";
import { StudentsFilterComponent } from "../students-filter/students-filter.component";
import { CookieService } from "../../../services/cookie.service";
import { ConfirmationComponent } from "../../../shared/confirmation/confirmation.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { PreloaderComponent } from "../../preloader/preloader.component";
import { DataSharingService } from "../../../services/data-sharing.service";
import { ExpiredComponent } from "../../../shared/expired/expired.component";

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Student>[];
}

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.scss"],
})
export class StudentsListComponent implements OnInit {
  public loading = true;
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public students: Student[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public students$: Observable<Student[]> | undefined;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public prefixoUrlStudent =
    "https://20231-familymusicsystem-production.up.railway.app/api/students";

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

    // if (jwt == null) {
    //   const dialogRef: MatDialogRef<ExpiredComponent> = this.dialog.open(
    //     ExpiredComponent,
    //     {
    //       data: {
    //         message: 'Sessão expirada, faça login novamente.',
    //         dialogRef: null,
    //       },
    //       disableClose: true,
    //     }
    //   );
    //   dialogRef.componentInstance.dialogRef = dialogRef;
    // } else {
    // }

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  getStudent(args?: string) {
    this.loading = true; // Define o estado de loading como true antes de fazer a requisição

    this.students$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlStudent}${args}` : this.prefixoUrlStudent,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((student) => {
            student.attributes.id = student.id;
          });
        }),
        map((response: Response) =>
          response.data.map((student) => student.attributes)
        )
      );

    this.students$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  search() {
    this.getStudent(
      `?filters[name][$startsWithi][0]=${this.searchForm.get("search")?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie("jwt");
    this.getStudent();
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  modalAddAlunos() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-xl",
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      StudentsRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertAdd) {
        this.getStudent();
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
          this.dataSharingService.ifshowAlertAdd = false;
        }, 3000);
      }
    });
  }

  modalEditAlunos(student: Student, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-xl",
      initialState: {
        student: student,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(
      StudentsViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertEdit) {
        this.getStudent();
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          this.dataSharingService.ifshowAlertEdit = false;
        }, 3000);
      }
    });
  }

  deleteStudent(student: Student) {
    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(
      ConfirmationComponent,
      {
        data: {
          message: "Deseja realmente excluir esse perfil?",
          dialogRef: null,
        },
      }
    );

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlStudent}/${student.id}`, this.headers())
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getStudent();
            this.showAlertDelete = true;
            setTimeout(() => {
              this.showAlertDelete = false;
            }, 3000);
          });
      }
    });
  }

  modalFilterAlunos() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: "modal-md",
    };
    this.bsModalRef = this.modalService.show(
      StudentsFilterComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe((url: string) => {
      this.getStudent(url);
    });
  }

  obterPrimeiroESegundoNome(nomeCompleto: string): string[] {
    const nomesSeparados = nomeCompleto.split(" ");
    const primeiroNome = nomesSeparados[0];
    const segundoNome = nomesSeparados[1];
    const completeName = primeiroNome + " " + segundoNome;
    return [completeName];
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
