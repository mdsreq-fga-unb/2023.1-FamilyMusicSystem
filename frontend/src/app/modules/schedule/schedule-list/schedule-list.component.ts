import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, from, map, Observable, of } from 'rxjs';
import {
  defaultIfEmpty,
  mergeMap,
  publishReplay,
  refCount,
  shareReplay,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from '../../../services/cookie.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../../../services/data-sharing.service';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { ScheduleViewComponent } from '../schedule-view/schedule-view.component';
import { ScheduleRegisterComponent } from '../schedule-register/schedule-register.component';
import { ScheduleFilterComponent } from '../schedule-filter/schedule-filter.component';
import { Teacher } from '../../../models/teacher';
import { Student } from '../../../models/student';
import { Schedule } from './../../../models/schedule';
import { Room } from '../../../models/room';
import format from 'date-fns/format';
import { pt } from 'date-fns/locale';

class Entry<T> {
  id: number;
  attributes: T;
}

class ResponseSchedule {
  data: Entry<Schedule>[];
}

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
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
    'https://20231-familymusicsystem-production.up.railway.app/api/schedules';
  public prefixoUrlRoom =
    'https://20231-familymusicsystem-production.up.railway.app/api/rooms/';
  public prefixoUrlStudent =
    'https://20231-familymusicsystem-production.up.railway.app/api/students/';
  public prefixoUrlTeacher =
    'https://20231-familymusicsystem-production.up.railway.app/api/teachers/';

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
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
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

    this.schedules$ = this.http
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
      `?filters[name][$startsWithi][0]=${this.searchForm.get('search')?.value}`
    );
  }

  ngOnInit(): void {
    const jwt = this.cookieService.getCookie('jwt');
    this.getSchedules();

    this.searchForm = this.fb.group({
      search: ['', Validators.required],
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
      class: 'modal-lg',
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
      class: 'modal-lg',
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
          message: 'Deseja realmente excluir a Agenda?',
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
      class: 'modal-md',
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
      return string.substring(0, 20) + '...';
    }
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
