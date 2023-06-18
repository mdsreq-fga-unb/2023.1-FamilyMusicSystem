import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentsRegisterComponent } from '../students-register/students-register.component';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { StudentsFilterComponent } from '../students-filter/students-filter.component';
import { CookieService } from '../../../services/cookie.service';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Student>[];
}

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public students : Student[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public students$: Observable<Student[]> | undefined;
  public prefixoUrlStudent =
    'https://20231-familymusicsystem-production.up.railway.app/api/students';

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  headers() {
    const jwt = this.cookieService.getCookie('jwt');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
    return opts;
  }

  getStudent(args?: string) {
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
  }

  search() {
    this.getStudent(
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie('jwt');
    console.log('jwt:' + jwt);
    this.getStudent();
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  getPrimeiroESegundoNome(nomeCompleto: string): string {
    const nomes = nomeCompleto.split(' ');
    return `${nomes[0]} ${nomes[1]}`;
  }

  modalNewAlunos() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      StudentsRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getStudent();
      this.showAlertAdd = true;
      setTimeout(() => {
        this.showAlertAdd = false;
      }, 3000);
    });
  }

  modalAlunos(student: Student, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
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
      this.getStudent();
      this.showAlertEdit = true;
      setTimeout(() => {
        this.showAlertEdit = false;
      }, 3000);
    });
  }

  deleteStudent(student: Student) {
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
      class: 'modal-md',
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
    const nomesSeparados = nomeCompleto.split(' ');
    const primeiroNome = nomesSeparados[0];
    const segundoNome = nomesSeparados[1];
    return [primeiroNome, segundoNome];
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
