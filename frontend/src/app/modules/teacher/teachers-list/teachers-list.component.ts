import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from '../../../models/teacher';
import { TeachersRegisterComponent } from '../teachers-register/teachers-register.component';
import { TeachersViewComponent } from '../teachers-view/teachers-view.component';
import { TeachersFilterComponent } from '../teachers-filter/teachers-filter.component';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeachersAlertComponent } from '../teachers-alert/teachers-alert.component';

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
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  public searchForm: FormGroup;
  estilosDinamicos: any;
  prefixoUrlTeacher = 'https://20231-familymusicsystem-production.up.railway.app/api/teachers';

  error: any | undefined;
  teachers$: Observable<Teacher[]> | undefined;



  constructor(
  private modalService: BsModalService,
  private http: HttpClient,
  private fb: FormBuilder) {}

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
    this.http
      .delete(`${this.prefixoUrlTeacher}/${teacher.id}`)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
        this.getTeacher();
        this.bsModalRef = this.modalService.show(TeachersAlertComponent, {
          initialState: {
            title: 'Exclusão concluída!',
            message: 'O aluno foi deletado com sucesso.',
          },
        });
        this.bsModalRef.content.showModal();
      });
  }

  modalProfessores(teacher: Teacher, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        edit,
        teacher: teacher,
      },
      class: 'modal-xl',
    };
    this.bsModalRef = this.modalService.show(
      TeachersViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getTeacher();
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
      initialState: {
      },
      class : 'modal-lg'
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
