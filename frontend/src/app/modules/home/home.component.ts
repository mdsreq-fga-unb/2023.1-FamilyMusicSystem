<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { CookieService } from './../../service/cookie.service';
import { Component } from '@angular/core';
>>>>>>> 3afbcba9357208606e81330b315a00a6e56a62b9
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AboutComponent } from '../settings/about/about.component';
import { CookieService } from 'src/app/services/cookie.service';

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
    console.log("teste:" + this.jwt)
  }

<<<<<<< HEAD
=======
  cookieValue: string | undefined;

  constructor(
    private modalService: BsModalService,
    private cookieService: CookieService
  ) {
    this.cookieValue = this.cookieService.getCookie('key');
  }

>>>>>>> 3afbcba9357208606e81330b315a00a6e56a62b9
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
