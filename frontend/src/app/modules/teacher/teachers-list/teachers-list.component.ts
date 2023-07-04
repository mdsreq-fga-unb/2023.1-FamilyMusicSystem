import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from './../../../models/teacher';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TeachersRegisterComponent } from '../teachers-register/teachers-register.component';
import { TeachersViewComponent } from '../teachers-view/teachers-view.component';
import { TeachersFilterComponent } from '../teachers-filter/teachers-filter.component';
import { CookieService } from '../../../services/cookie.service';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { PreloaderComponent } from '../../preloader/preloader.component';
import { DataSharingService } from '../../../services/data-sharing.service';
import { ExpiredComponent } from '../../../shared/expired/expired.component';

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Teacher>[];
}

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent implements OnInit {
  public loading = true;
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public teachers: Teacher[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public teachers$: Observable<Teacher[]> | undefined;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public prefixoUrlTeacher =
    'https://20231-familymusicsystem-production.up.railway.app/api/teachers';

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dataSharingService: DataSharingService
  ) {}

  headers() {
    const jwt = this.cookieService.getCookie('jwt');
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
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
    return opts;
  }

  getTeacher(args?: string) {
    this.loading = true; // Define o estado de loading como true antes de fazer a requisição

    this.teachers$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlTeacher}${args}` : this.prefixoUrlTeacher,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((teacher) => {
            teacher.attributes.id = teacher.id;
          });
        }),
        map((response: Response) =>
          response.data.map((teacher) => teacher.attributes)
        )
      );

    this.teachers$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  search() {
    this.getTeacher(
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie('jwt');
    this.getTeacher();
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  modalAddProfessores() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      TeachersRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertAdd) {
        this.getTeacher();
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
          this.dataSharingService.ifshowAlertAdd = false;
        }, 3000);
      }
    });
  }

  modalEditProfessores(teacher: Teacher, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
      initialState: {
        teacher: teacher,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(
      TeachersViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertEdit) {
        this.getTeacher();
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          this.dataSharingService.ifshowAlertEdit = false;
        }, 3000);
      }
    });
  }

  deleteTeacher(teacher: Teacher) {
    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(
      ConfirmationComponent,
      {
        data: {
          message: 'Deseja realmente excluir esse perfil?',
          dialogRef: null,
        },
      }
    );

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlTeacher}/${teacher.id}`, this.headers())
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getTeacher();
            this.showAlertDelete = true;
            setTimeout(() => {
              this.showAlertDelete = false;
            }, 3000);
          });
      }
    });
  }

  modalFilterProfessores() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(
      TeachersFilterComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe((url: string) => {
      this.getTeacher(url);
    });
  }

  obterPrimeiroESegundoNome(nomeCompleto: string): string[] {
    const nomesSeparados = nomeCompleto.split(' ');
    const primeiroNome = nomesSeparados[0];
    const segundoNome = nomesSeparados[1];
    const completeName = primeiroNome + ' ' + segundoNome;
    return [completeName];
  }

  toggle() {
    this.estilosDinamicos = {
      background: this.calcularCorDeFundo(),
    };
  }

  calcularCorDeFundo() {
    return 'var(--selector)';
  }
}
