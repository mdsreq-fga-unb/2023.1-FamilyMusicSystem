import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoomRegisterComponent } from '../room-register/room-register.component';
import { RoomFilterComponent } from '../room-filter/room-filter.component';
import { Classroom } from '../../../models/classroom';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { RoomViewComponent } from '../room-view/room-view.component';

class Entry<T> {
  id: number;
  attributes: T;
}

class Response {
  data: Entry<Classroom>[];
}

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  checked: boolean = false;
  error: any | undefined;
  estilosDinamicos: any;
  Rooms$: Observable<Classroom[]> | undefined;
  prefixoUrlRoom =
    'https://20231-familymusicsystem-production.up.railway.app/api/classrooms';

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(args?: string) {
    const opts = { params: { populate: '*' } };
    this.Rooms$ = this.http
      .get<Response>(
        args ? `${this.prefixoUrlRoom}${args}` : this.prefixoUrlRoom,
        opts
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((response: Response) => {
          response.data.forEach((room) => {
            room.attributes.id = room.id;
          });
        }),
        map((response: Response) =>
          response.data.map((room) => room.attributes)
        )
      );
  }

  deleteRoom(room: Classroom) {
    this.http
      .delete(`${this.prefixoUrlRoom}/${room.id}`)
      .pipe(catchError((error) => this.handleError(error)))
      .subscribe((response) => {
        console.log(response);
        this.getRoom();
      });
  }

  modalNewSala() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      RoomRegisterComponent,
      modalConfig
    );
    this.bsModalRef.onHide?.subscribe(() => {
      this.getRoom();
    });
  }

  modalRoom(room: Classroom, edit: boolean) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-xl',
      initialState: {
        room: room,
        edit,
      },
    };
    this.bsModalRef = this.modalService.show(RoomViewComponent, modalConfig);
    this.bsModalRef.onHide?.subscribe(() => {
      this.getRoom();
    });
  }

  modalFilterSala() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(RoomFilterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }

  toggle() {
    this.estilosDinamicos = {
      background: this.calcularCorDeFundo(),
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  calcularCorDeFundo() {
    return 'var(--selector)';
  }
}
