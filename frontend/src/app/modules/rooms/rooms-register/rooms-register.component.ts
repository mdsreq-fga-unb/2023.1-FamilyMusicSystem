import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rooms } from 'src/app/models/rooms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms-register',
  templateUrl: './rooms-register.component.html',
  styleUrls: ['./rooms-register.component.scss']
})
export class RoomsRegisterComponent implements OnInit {
  public rooms: Rooms;
  public onClose: Subject<boolean>;
  public edicao = false;
  public inicial = true;
  public classForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      className: [null, Validators.required],
      classDescription: [null, Validators.required],
      classCapacity: [null, Validators.required],
      classNumber: [null, Validators.required],
      classLocal: [null, Validators.required],
    });
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
  }

  sair() {
    this.bsModalRef.hide();
  }
}
