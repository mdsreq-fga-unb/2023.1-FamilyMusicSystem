import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rooms } from 'src/app/models/rooms';
import { RoomsRegisterComponent } from '../rooms-register/rooms-register.component';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit{
  checked : boolean = false;
  estilosDinamicos: any;
  public rooms : Rooms[];
  private bsModalRef : BsModalRef

  constructor(
    private modalService : BsModalService,

  ){}

  ngOnInit(): void {
    
  }

  modalSala(edicao:boolean,room:Rooms = new Rooms()){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        edicao,
        room : room
      },
      class : 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(RoomsRegisterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }

  modalFilterSala(){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
      },
      class : 'modal-md'
    };
    this.bsModalRef = this.modalService.show(RoomsFilterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }

  toggle(){
    this.estilosDinamicos = {
      'background' : this.calcularCorDeFundo()
    };
  }

  calcularCorDeFundo(){
    return 'var(--selector)';
  }
}
