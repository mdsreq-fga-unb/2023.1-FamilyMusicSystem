import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Room } from 'src/app/models/room';
import { roomRegisterComponent } from '../room-register/room-register.component';
import { roomFilterComponent } from '../room-filter/room-filter.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class roomListComponent implements OnInit {
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
      roomRegisterComponent,
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
    this.bsModalRef = this.modalService.show(roomFilterComponent, modalConfig);
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
