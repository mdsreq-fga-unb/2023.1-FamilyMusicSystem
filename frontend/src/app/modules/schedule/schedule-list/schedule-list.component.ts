import { Lesson } from 'src/app/models/lesson';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleRegisterComponent } from '../schedule-register/schedule-register.component';
import { ScheduleFilterComponent } from '../schedule-filter/schedule-filter.component';
import { ScheduleViewComponent } from '../schedule-view/schedule-view.component';
import { StudentsAlertComponent } from '../../student/students-alert/students-alert.component';

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Lesson>[];
}



@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  public searchForm: FormGroup;
  estilosDinamicos: any;

  prefixoUrlLesson =
    'https://20231-familymusicsystem-production.up.railway.app/api/lessons';

  

  error: any | undefined;
  lessonss$: Observable<Lesson[]> | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  getLesson(args?: string) {
    const opts = { params: { populate: '*' } };
    this.lessonss$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlLesson}${args}` : this.prefixoUrlLesson,
        opts
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((lesson) => {
            lesson.attributes.id = lesson.id;
          });
        }),
        map((response: Response) =>
          response.data.map((lesson) => lesson.attributes)
        )
      );
  }

  deleteLesson(lesson: Lesson) {
    this.http
      .delete(`${this.prefixoUrlLesson}/${lesson.id}`)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
        this.getLesson();
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
    this.getLesson(
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
  }

  ngOnInit(): void {
    this.getLesson();
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  modalNewLesson() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-lg',
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      ScheduleRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getLesson();
    });
  }

  modalLesson(lesson: Lesson, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
      initialState: {
        lesson: lesson,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(
      ScheduleViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getLesson();
    });
  }

  modalFilterLessons() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(
      ScheduleFilterComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe((url: string) => {
      this.getLesson(url);
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




  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

}
