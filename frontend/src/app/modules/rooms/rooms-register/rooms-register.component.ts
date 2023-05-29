import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rooms-register',
  templateUrl: './rooms-register.component.html',
  styleUrls: ['./rooms-register.component.scss']
})
export class RoomsRegisterComponent {
  private bsModalRef : BsModalRef;
}
