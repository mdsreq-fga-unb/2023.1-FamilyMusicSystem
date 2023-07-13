import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, forkJoin, from, map, Observable, of } from "rxjs";
import {
  defaultIfEmpty,
  mergeMap,
  publishReplay,
  refCount,
  shareReplay,
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CookieService } from "../../../services/cookie.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataSharingService } from "../../../services/data-sharing.service";
import { ConfirmationComponent } from "../../../shared/confirmation/confirmation.component";
import { ScheduleViewComponent } from "../schedule-view/schedule-view.component";
import { ScheduleRegisterComponent } from "../schedule-register/schedule-register.component";
import { ScheduleFilterComponent } from "../schedule-filter/schedule-filter.component";
import { Teacher } from "../../../models/teacher";
import { Student } from "../../../models/student";
import { Schedule } from "./../../../models/schedule";
import { Room } from "../../../models/room";
import format from "date-fns/format";
import { pt } from "date-fns/locale";

class Entry<T> {
  id: number;
  attributes: T;
}

class ResponseSchedule {
  data: Entry<Schedule>[];
}
class ResponseStudent {
  data: Entry<Student>;
}
class ResponseTeacher {
  data: Entry<Teacher>;
}

class ResponseRoom {
  data: Entry<Room>;
}

@Component({
  selector: "app-schedule-list",
  templateUrl: "./schedule-list.component.html",
  styleUrls: ["./schedule-list.component.scss"],
})
export class ScheduleListComponent implements OnInit {
  public loading = true;
  public showAlertEdit = false;
  public showAlertDelete = false;
  public showAlertAdd = false;
  public schedules: Schedule[];
  private bsModalRef: BsModalRef;
  public checked: boolean = false;
  public searchForm: FormGroup;
  public estilosDinamicos: any;
  public error: any | undefined;
  public schedules$: Observable<Schedule[]> | undefined;
  public teachers$: Observable<Teacher[]> | undefined;
  public students$: Observable<Student[]> | undefined;
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  public prefixoUrlSchedule =
    "https://20231-familymusicsystem-production.up.railway.app/api/schedules";
  public prefixoUrlRoom =
    "https://20231-familymusicsystem-production.up.railway.app/api/rooms/";
  public prefixoUrlStudent =
    "https://20231-familymusicsystem-production.up.railway.app/api/students/";
  public prefixoUrlTeacher =
    "https://20231-familymusicsystem-production.up.railway.app/api/teachers/";

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
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: "*" } };
    return opts;
  }

  date(date: string) {
    const formattedDate = format(Date.parse(date), `dd'/'MM '-' HH':'mm`, {
      locale: pt,
    });
    return formattedDate;
  }

  getSchedules(args?: string) {
    this.loading = true;

    const scheduleRequest = this.http
      .get<ResponseSchedule>(
        args ? `${this.prefixoUrlSchedule}${args}` : this.prefixoUrlSchedule,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: ResponseSchedule) => {
          response.data.forEach((schedule) => {
            schedule.attributes.id = schedule.id;
          });
        }),
        map((response: ResponseSchedule) =>
          response.data.map((schedule) => schedule.attributes)
        ),
        shareReplay(1)
      );

    this.schedules$ = scheduleRequest.pipe(
      mergeMap((schedules) => {
        if (schedules.length === 0) {
          return of([]); // Retorna um array vazio se não houver registros na agenda
        }

        const roomRequests = schedules.map(
          (schedule) =>
            this.http
              .get<ResponseRoom>(
                `${this.prefixoUrlRoom}${schedule.ID_Room}`,
                this.headers()
              )
              .pipe(
                catchError((error) => this.handleError(error)),
                tap((room: ResponseRoom) => {
                  room.data.attributes.id = room.data.id;
                }),
                map((room: ResponseRoom) => room.data.attributes)
              ),
          shareReplay(1)
        );

        const studentRequests = schedules.map(
          (schedule) =>
            this.http
              .get<ResponseStudent>(
                `${this.prefixoUrlStudent}${schedule.ID_Student}`,
                this.headers()
              )
              .pipe(
                catchError((error) => this.handleError(error)),
                tap((student: ResponseStudent) => {
                  student.data.attributes.id = student.data.id;
                }),
                map((student: ResponseStudent) => student.data.attributes)
              ),
          shareReplay(1)
        );

        const teacherRequests = schedules.map(
          (schedule) =>
            this.http
              .get<ResponseTeacher>(
                `${this.prefixoUrlTeacher}${schedule.ID_Teacher}`,
                this.headers()
              )
              .pipe(
                catchError((error) => this.handleError(error)),
                tap((teacher: ResponseTeacher) => {
                  teacher.data.attributes.id = teacher.data.id;
                }),
                map((teacher: ResponseTeacher) => teacher.data.attributes)
              ),
          shareReplay(1)
        );

        return forkJoin(roomRequests).pipe(
          map((rooms) => {
            schedules.forEach((schedule, index) => {
              schedule.RoomObject = rooms[index];
            });
            return schedules;
          }),
          mergeMap((updatedSchedules) =>
            forkJoin(studentRequests).pipe(
              map((students) => {
                updatedSchedules.forEach((schedule, index) => {
                  schedule.StudentObject = students[index];
                });
                return updatedSchedules;
              })
            )
          ),
          mergeMap((updatedSchedules) =>
            forkJoin(teacherRequests).pipe(
              map((teachers) => {
                updatedSchedules.forEach((schedule, index) => {
                  schedule.TeacherObject = teachers[index];
                });
                return updatedSchedules;
              })
            )
          )
        );
      }),
      defaultIfEmpty([]) // Retorna um array vazio se o observable estiver vazio após as transformações
    );

    this.schedules$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  search() {
    this.getSchedules(
      `?filters[name][$startsWithi][0]=${this.searchForm.get("search")?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie("jwt");
    this.getSchedules();

    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;

    return of();
  }

  modalAddAgenda() {
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
      if (this.dataSharingService.ifshowAlertAdd) {
        this.getSchedules();
        this.showAlertAdd = true;
        setTimeout(() => {
          this.showAlertAdd = false;
          this.dataSharingService.ifshowAlertAdd = false;
        }, 3000);
      }
    });
  }

  modalEditAgenda(schedule: Schedule, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: "modal-lg",
      initialState: {
        schedule: schedule,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(
      ScheduleViewComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.dataSharingService.ifshowAlertEdit) {
        this.getSchedules();
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          this.dataSharingService.ifshowAlertEdit = false;
        }, 3000);
      }
    });
  }

  deleteSchedule(schedules: Schedule) {
    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(
      ConfirmationComponent,
      {
        data: {
          message: "Deseja realmente excluir a Agenda?",
          dialogRef: null,
        },
      }
    );

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.http
          .delete(`${this.prefixoUrlSchedule}/${schedules.id}`, this.headers())
          .pipe(catchError((error) => this.handleError(error)))
          .subscribe((response) => {
            console.log(response);
            dialogRef.close();
            this.getSchedules();
            this.showAlertDelete = true;
            setTimeout(() => {
              this.showAlertDelete = false;
            }, 3000);
          });
      }
    });
  }

  modalFilterSala() {
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
      this.getSchedules(url);
    });
  }

  exibirString(string: string): string {
    if (string.length <= 20) {
      return string;
    } else {
      return string.substring(0, 20) + "...";
    }
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
