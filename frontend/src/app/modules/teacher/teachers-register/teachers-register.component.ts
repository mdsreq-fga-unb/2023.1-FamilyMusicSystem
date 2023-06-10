import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Teacher } from '../../../models/teacher';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TeachersAlertComponent } from '../teachers-alert/teachers-alert.component';

@Component({
  selector: 'app-teachers-register',
  templateUrl: './teachers-register.component.html',
  styleUrls: ['./teachers-register.component.scss']
})
export class TeachersRegisterComponent implements OnInit {
  public onClose : Subject<boolean>;
  public teacher : Teacher;
  public teacherForm : FormGroup;
  error: any | undefined;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      nameTeacher:[null , Validators.required],
      emailTeacher:[null , Validators.required,Validators.email],
      phoneTeacher:[
        null ,
        [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        ]
      ],
      cpfTeacher:[
        null ,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ]
      ],
      rgTeacher:[null , Validators.required],
      genderTeacher:[null , Validators.required],
      instrumentTeacher:[null , Validators.required],
      
    })
  }

  onSubmit(): void {
    const teacher: Teacher = new Teacher();
    teacher.Name = this.teacherForm.get('nameTeacher')?.value;
    teacher.Email = this.teacherForm.get('emailTeacher')?.value;
    teacher.Phone = this.teacherForm.get('phoneTeacher')?.value;
    teacher.CPF = this.teacherForm.get('cpfTeacher')?.value;
    teacher.RG = this.teacherForm.get('rgTeacher')?.value;
    teacher.Gender = this.teacherForm.get('genderTeacher')?.value;
    teacher.Instruments = this.teacherForm.get('instrumentTeacher')?.value;
    const body = {
      data: teacher,
    };

    this.http.post('https://20231-familymusicsystem-production.up.railway.app/api/teachers', body).subscribe(
      (response) => {
        this.bsModalRef = this.modalService.show(TeachersAlertComponent, {
          initialState: {
            title: 'Cadastro finalizado!',
            message: 'O aluno foi cadastrado com sucesso.',
          },
        });
        this.bsModalRef.content.showModal();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  sair(){
    this.bsModalRef.hide();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  scrollTop() {
    const div = document.getElementById('scroll');
    if (div !== null) {
      div.scrollTop = 0;
    }
  }


}
