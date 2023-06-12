
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AboutComponent } from '../settings/about/about.component';
import { CookieService } from 'src/app/services/cookie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private bsModalRef: BsModalRef;
  public jwt: any;

  constructor(private modalService: BsModalService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.jwt = this.cookieService.getCookie("jwt");
  }

  modalabout() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(AboutComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => { });
  }
}
