import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './../../../models/student';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentsRegisterComponent } from '../students-register/students-register.component';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { StudentsFilterComponent } from '../students-filter/students-filter.component';
import { StudentsAlertComponent } from '../students-alert/students-alert.component';
import { CookieService } from 'src/app/services/cookie.service';

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
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  public searchForm: FormGroup;
  estilosDinamicos: any;
  prefixoUrlStudent = 'http://localhost:1337/api/students';

  error: any | undefined;
  students$: Observable<Student[]> | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) { }

  getStudent(args?: string) {
    const jwt = this.cookieService.getCookie('jwt');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);

    const opts = { headers: headers, params: { populate: '*' } };
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
    const jwt = this.cookieService.getCookie('jwt');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);

    const opts = { headers: headers };
    this.http
      .delete(`${this.prefixoUrlStudent}/${student.id}`, opts)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
        this.getStudent();
        this.bsModalRef = this.modalService.show(StudentsAlertComponent, {
          initialState: {
            title: 'Exclusão concluída!',
            message: 'O aluno foi deletado com sucesso.',
          },
        });
        this.bsModalRef.content.showModal();
      });
  }


  search() {
    this.getStudent(
      `?filters[name][$startsWithi]=${this.searchForm.get('search')?.value}`
    );
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie('jwt');
    console.log("jwt:" + jwt);
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
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      StudentsFilterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getStudent();
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
