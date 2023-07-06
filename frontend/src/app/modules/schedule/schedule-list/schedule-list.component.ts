import { CookieService } from "./../../../services/cookie.service";
import { Schedule } from "../../../models/schedule";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ScheduleRegisterComponent } from "../schedule-register/schedule-register.component";
import { ScheduleFilterComponent } from "../schedule-filter/schedule-filter.component";
import { ScheduleViewComponent } from "../schedule-view/schedule-view.component";
import { HttpHeaders } from "@angular/common/http";
import format from "date-fns/format";
import { pt } from "date-fns/locale";

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Schedule>[];
}

@Component({
  selector: "app-schedule-list",
  templateUrl: "./schedule-list.component.html",
  styleUrls: ["./schedule-list.component.scss"],
})
export class ScheduleListComponent {
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  public searchForm: FormGroup;
  estilosDinamicos: any;

  prefixoUrlLesson =
    "https://20231-familymusicsystem-production.up.railway.app/api/lessons";

  error: any | undefined;
  lessonss$: Observable<Schedule[]> | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {}

  headers() {
    const jwt = this.cookieService.getCookie("jwt");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  getLesson(args?: string) {
    this.lessonss$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlLesson}${args}` : this.prefixoUrlLesson,
        this.headers()
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

  deleteLesson(lesson: Schedule) {
    this.http
      .delete(`${this.prefixoUrlLesson}/${lesson.id}`, this.headers())
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
        this.getLesson();
      });
  }

  search() {
    this.getLesson(
      `?filters[name][$startsWithi][0]=${this.searchForm.get("search")?.value}`
    );
  }

  ngOnInit(): void {
    this.getLesson();
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  modalNewLesson() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-lg",
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

  modalLesson(lesson: Schedule, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-xl",
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
      class: "modal-md",
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

  date(date: string) {
    const formattedDate = format(Date.parse(date), `HH':'mm '-' dd'/'MM`, {
      locale: pt,
    });
    return formattedDate;
  }

  calcularCorDeFundo() {
    return "var(--selector)";
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }
}
