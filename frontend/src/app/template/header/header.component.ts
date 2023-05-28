import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { TeachersFilterComponent } from 'src/app/modules/teacher/teachers-filter/teachers-filter.component';
import { HelpModalComponent } from 'src/app/shared/help-modal/help-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  icon = ['brightness_2', 'wb_sunny'];
  icon_now = 'brightness_2';
  private bsModalRef : BsModalRef

  constructor(
    private modalService : BsModalService,

  ){}


  ngOnInit(): void {

  }

  modalAjuda(){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
      },
      class : 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(HelpModalComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }

  toggle() {
    const theme = document.body.classList.toggle('darkTheme');

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }
}
