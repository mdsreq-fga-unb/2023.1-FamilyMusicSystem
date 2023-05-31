import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.scss'],
})
export class StudentsRegisterComponent implements OnInit {
  public onClose: Subject<boolean>;
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public student: Student;
  public studentForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      nomeStudent: [null, Validators.required],
      sobreStudent: [null, Validators.required],
      nomeStudentResp: [null, Validators.required],
      sobreStudentResp: [null, Validators.required],
      cityStudent: [null, Validators.required],
      cepStudent: [null, Validators.required],
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

  informacoesLoc() {
    this.inicial = false;
    this.Resp = true;
    this.scrollTop();
  }

  informacoesResp() {
    this.Resp = false;
    this.location = true;
    this.scrollTop();
  }
}
