import { Student } from './../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentsRegisterComponent } from '../students-register/students-register.component';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { StudentsFilterComponent } from '../students-filter/students-filter.component';
import { StudentsAlertComponent } from '../students-alert/students-alert.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showAlert = false;
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  public searchForm: FormGroup;
  estilosDinamicos: any;
  prefixoUrlStudent =
    'https://20231-familymusicsystem-production.up.railway.app/api/students';

  error: any | undefined;
  students$: Observable<Student[]> | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: BsModalRef,
  ) { }

  getStudent(args?: string) {
    const opts = { params: { populate: '*' } };
    this.students$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlStudent}${args}` : this.prefixoUrlStudent,
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



  deleteStudent(student: Student) {
    const dialogRef: MatDialogRef<StudentsAlertComponent> = this.dialog.open(StudentsAlertComponent, {
      data: {
        message: 'Você tem certeza que deseja excluir esse usuário?',
        dialogRef: null
      }
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlStudent}/${student.id}`)
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getStudent();
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          });
      }
    });
  }

  search() {
    this.getStudent(
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
  }

  ngOnInit(): void {
    this.getStudent();
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
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

  toggle() {
    this.estilosDinamicos = {
      background: this.calcularCorDeFundo(),
    };
  }

  calcularCorDeFundo() {
    return 'var(--selector)';
  }
}
