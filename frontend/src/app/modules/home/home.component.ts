import { CookieService } from './../../service/cookie.service';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AboutComponent } from '../settings/about/about.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private bsModalRef: BsModalRef;

  cookieValue: string | undefined;

  constructor(
    private modalService: BsModalService,
    private cookieService: CookieService
  ) {
    this.cookieValue = this.cookieService.getCookie('key');
  }

  modalabout() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(AboutComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }
}
