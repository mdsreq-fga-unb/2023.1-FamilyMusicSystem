import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Room } from 'src/app/models/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-register',
  templateUrl: './room-register.component.html',
  styleUrls: ['./room-register.component.scss'],
})
export class RoomRegisterComponent implements OnInit {
  public room: Room;
  public onClose: Subject<boolean>;
  public edicao = false;
  public inicial = true;
  public classForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

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
