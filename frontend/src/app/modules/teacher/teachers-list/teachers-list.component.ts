import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from '../../../models/teacher';
import { TeachersRegisterComponent } from '../teachers-register/teachers-register.component';
import { TeachersViewComponent } from '../teachers-view/teachers-view.component';
import { TeachersFilterComponent } from '../teachers-filter/teachers-filter.component';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent implements OnInit {
  public teachers: Teacher[];
  private bsModalRef: BsModalRef;
  checked: boolean = false;
  estilosDinamicos: any;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  modalProfessores(edicao: boolean, teacher: Teacher = new Teacher()) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        edicao,
        teacher: teacher,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      TeachersRegisterComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe(() => {});
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
    this.bsModalRef.content.onClose.subscribe(() => {});
  }

  modalFilterProfessores() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(
      TeachersFilterComponent,
      modalConfig
    );
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
