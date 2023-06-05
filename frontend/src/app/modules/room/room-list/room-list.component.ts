import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Room } from 'src/app/models/room';
import { RoomRegisterComponent } from '../room-register/room-register.component';
import { RoomFilterComponent } from '../room-filter/room-filter.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  checked: boolean = false;
  estilosDinamicos: any;
  public room: Room[];
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  modalSala(edicao: boolean, room: Room = new Room()) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        edicao,
        room: room,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      RoomRegisterComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe(() => {});
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

  calcularCorDeFundo() {
    return 'var(--selector)';
  }
}
