import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from '../../../models/teacher';
import { TeachersRegisterComponent } from '../teachers-register/teachers-register.component';
import { TeachersViewComponent } from '../teachers-view/teachers-view.component';
import { TeachersFilterComponent } from '../teachers-filter/teachers-filter.component';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { Observable, catchError, map, of, tap, timeout } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

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
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public prefixoUrlTeacher =
    'https://20231-familymusicsystem-production.up.railway.app/api/teachers';

  public error: any | undefined;
  public teachers$: Observable<Teacher[]> | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.getTeacher();
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  getTeacher(args?: string) {
    const opts = { params: { populate: '*' } };
    this.teachers$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlTeacher}${args}` : this.prefixoUrlTeacher,
        opts
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
          .delete(`${this.prefixoUrlTeacher}/${teacher.id}`)
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

  modalProfessores(teacher: Teacher, edit: boolean) {

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
      this.getTeacher();
      this.showAlertEdit = true;
      setTimeout(() => {
        this.showAlertEdit = false;
      }, 3000);
    });
  }

  modalNewProfessores() {
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
      this.getTeacher();
      this.showAlertAdd = true;
      setTimeout(() => {
        this.showAlertAdd = false;
      }, 3000);
    });
  }

  modalViewProfessores() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      TeachersViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getTeacher();
    });
  }

  search() {
    this.getTeacher(
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
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

  toggle() {
    this.estilosDinamicos = {
      background: this.calcularCorDeFundo(),
    };
  }

  calcularCorDeFundo() {
    return 'var(--selector)';
  }
}
