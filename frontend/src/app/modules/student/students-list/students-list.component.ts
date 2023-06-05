import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentsRegisterComponent } from '../students-register/students-register.component';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { StudentsFilterComponent } from '../students-filter/students-filter.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';

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
  estilosDinamicos: any;
  prefixoUrlStudent = 'http://localhost:1337/api/students/';

  error: any | undefined;
  students$: Observable<Student[]> | undefined;

  constructor(private modalService: BsModalService, private http: HttpClient) {}

  getStudent() {
    const opts = { params: { populate: '*' } };
    this.students$ = this.http.get<Response>(this.prefixoUrlStudent, opts).pipe(
      catchError((error) => this.handleError(error)),
      map((response) => response.data.map((student) => student.attributes))
    );
  }

  deleteStudent(student: Student) {
    this.http
      .delete(`${this.prefixoUrlStudent}`)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
      });
    this.getStudent();
  }

  ngOnInit(): void {
    this.getStudent();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }

  modalAlunos() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
    };
    this.bsModalRef = this.modalService.show(
      StudentsRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getStudent();
    });
  }

  modalViewAlunos(student: Student) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-md',
      initialState: {
        student: student,
      },
    };
    this.bsModalRef = this.modalService.show(
      StudentsViewComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe(() => {});
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
    this.bsModalRef.content.onClose.subscribe(() => {});
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
