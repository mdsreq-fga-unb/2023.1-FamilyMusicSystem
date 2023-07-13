import { Schedule } from './../../../models/schedule';
import { CookieService } from './../../../services/cookie.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, catchError, map, tap } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../../../models/room';
import { Teacher } from '../../../models/teacher';
import { Student } from '../../../models/student';
import { DataSharingService } from '../../../services/data-sharing.service';
import * as moment from 'moment';

class Entry<T> {
  id: number;
  attributes: T;
}
class ResponseStudent {
  data: Entry<Student>[];
}
class ResponseTeacher {
  data: Entry<Teacher>[];
}

class ResponseRoom {
  data: Entry<Room>[];
}

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss'],
})
export class ScheduleViewComponent implements OnInit {
  public baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
  prefixoUrlRoom =
    'https://20231-familymusicsystem-production.up.railway.app/api/rooms';

  prefixoUrlStudent =
    'https://20231-familymusicsystem-production.up.railway.app/api/students';

  prefixoUrlTeacher =
    'https://20231-familymusicsystem-production.up.railway.app/api/teachers';
  public onClose: Subject<boolean>;
  public edicao = false;
  public inicial = true;
  public guardian = false;
  public schedule: Schedule;
  public scheduleForm: FormGroup;
  public valid: boolean = false;
  public showAlert: boolean = false;
  public nome: string;
  public dataAtual: string;
  public loading: boolean = false;
  public edit = false;
  public isFormValid = false;
  public canEdit: boolean = false;

  rooms$: Observable<Room[]> | undefined;
  teachers$: Observable<Teacher[]> | undefined;
  students$: Observable<Student[]> | undefined;

  error: any | undefined;
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) {
    this.dataAtual = new Date().toISOString().split('T')[0];
  }

  headers() {
    const jwt = this.cookieService.getCookie('jwt');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${jwt}`);
    const opts = { headers: headers, params: { populate: '*' } };
    return opts;
  }

  getHeaders(): HttpHeaders {
    const jwt = this.cookieService.getCookie('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return headers;
  }

  ngOnInit(): void {
    const formattedHorary = moment(this.schedule?.Horary).format(
      'YYYY-MM-DDTHH:mm'
    );
    this.scheduleForm = this.fb.group({
      ID_Student: [
        { value: this.schedule?.Student, disabled: !this.edit },
        Validators.required,
      ],
      ID_Teacher: [
        { value: this.schedule?.Teacher, disabled: !this.edit },
        Validators.required,
      ],
      ID_Room: [
        { value: this.schedule?.Room, disabled: !this.edit },
        Validators.required,
      ],
      Horary: [
        {
          value: formattedHorary,
          disabled: !this.edit,
        },
        Validators.required,
      ],
    });

    this.cdr.detectChanges();
    this.scheduleForm.updateValueAndValidity();
    this.scheduleForm.statusChanges.subscribe(() => {
      this.isFormValid = this.scheduleForm.valid;
    });

    this.getStudent();
    this.getTeacher();
    this.getRoom();
  }

  separar(str: string, propriedade: 'id' | 'name'): string {
    const [id, name] = str.split('-');
    return propriedade === 'id' ? id : name;
  }

  onEdit($schedule: Schedule): void {
    const schedule: Schedule = new Schedule();
    const baseUrl = `https://20231-familymusicsystem-production.up.railway.app`;
    const headers = this.getHeaders();
    const requestOptions = { headers };

    schedule.ID_Student = this.separar(
      this.scheduleForm.get('ID_Student')?.value?.toString(),
      'id'
    );
    schedule.Student = this.separar(
      this.scheduleForm.get('ID_Student')?.value?.toString(),
      'name'
    );
    schedule.ID_Teacher = this.separar(
      this.scheduleForm.get('ID_Teacher')?.value?.toString(),
      'id'
    );
    schedule.Teacher = this.separar(
      this.scheduleForm.get('ID_Teacher')?.value?.toString(),
      'name'
    );
    schedule.ID_Room = this.separar(
      this.scheduleForm.get('ID_Room')?.value?.toString(),
      'id'
    );
    schedule.Room = this.separar(
      this.scheduleForm.get('ID_Room')?.value?.toString(),
      'name'
    );
    schedule.Horary = this.scheduleForm.get('Horary')?.value;
    const body = {
      data: schedule,
    };

    this.http
      .put(
        `https://20231-familymusicsystem-production.up.railway.app/api/schedules/${$schedule.id}`,
        body,
        this.headers()
      )
      .subscribe(
        () => {
          this.dataSharingService.ifshowAlertEdit = true;
          this.showAlert = true;
          this.loading = true;
          this.bsModalRef.hide();
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  getStudent(args?: string) {
    this.loading = true;

    this.students$ = this.http
      .get<ResponseStudent>(
        args ? `${this.prefixoUrlStudent}${args}` : this.prefixoUrlStudent,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: ResponseStudent) => {
          response.data.forEach((student) => {
            student.attributes.id = student.id;
          });
        }),
        map((response: ResponseStudent) =>
          response.data.map((student) => student.attributes)
        )
      );

    this.students$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  getTeacher(args?: string) {
    this.loading = true;

    this.teachers$ = this.http
      .get<ResponseTeacher>(
        args ? `${this.prefixoUrlTeacher}${args}` : this.prefixoUrlTeacher,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: ResponseTeacher) => {
          response.data.forEach((teacher) => {
            teacher.attributes.id = teacher.id;
          });
        }),
        map((response: ResponseTeacher) =>
          response.data.map((teacher) => teacher.attributes)
        )
      );

    this.teachers$.subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  getRoom(args?: string) {
    this.loading = true;

    this.rooms$ = this.http
      .get<ResponseRoom>(
        args ? `${this.prefixoUrlRoom}${args}` : this.prefixoUrlRoom,
        this.headers()
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: ResponseRoom) => {
          response.data.forEach((room) => {
            room.attributes.id = room.id;
          });
        }),
        map((response: ResponseRoom) =>
          response.data.map((room) => room.attributes)
        )
      );

    this.rooms$.subscribe(
      (room) => {
        this.loading = false;
        console.log(room);
      },
      () => {
        this.loading = false;
      }
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  sair() {
    this.bsModalRef.hide();
  }
}
