import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Teacher } from 'src/app/models/teacher';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teachers-register',
  templateUrl: './teachers-register.component.html',
  styleUrls: ['./teachers-register.component.scss']
})
export class TeachersRegisterComponent implements OnInit {
  public onClose : Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public teacher : Teacher;
  public teacherForm : FormGroup;

  constructor(
    private bsModalRef : BsModalRef,
    private fb : FormBuilder,
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      nomeTeacher:[null , Validators.required],
      sobreTeacher:[null , Validators.required],
      cityTeacher: [null , Validators.required],
      cepTeacher: [null , Validators.required],
    })
  }

  sair(){
    this.bsModalRef.hide();
  }

  informacoesLoc(){
    this.location = true;
    this.inicial = false;
  }

}