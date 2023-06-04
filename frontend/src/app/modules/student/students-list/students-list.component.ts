import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Student } from 'src/app/models/student';
import { StudentsRegisterComponent } from '../students-register/students-register.component';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { StudentsFilterComponent } from '../students-filter/students-filter.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit{
  public students : Student[];
  private bsModalRef : BsModalRef
  checked : boolean = false;
  estilosDinamicos: any;

  constructor(
    private modalService : BsModalService,

  ){}


  ngOnInit(): void {

  }

  modalAlunos(edicao:boolean,student:Student = new Student()){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        edicao,
        student : student
      },
      class : 'modal-xl'
    };
    this.bsModalRef = this.modalService.show(StudentsRegisterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }

  modalViewAlunos(){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
      },
      class : 'modal-md'
    };
    this.bsModalRef = this.modalService.show(StudentsViewComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }


  modalFilterAlunos(){
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
      },
      class : 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(StudentsFilterComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {

    })
  }

  toggle(){
    this.estilosDinamicos = {
      'background' : this.calcularCorDeFundo()
    };
  }

  calcularCorDeFundo(){
    return 'var(--selector)';
  }


}
