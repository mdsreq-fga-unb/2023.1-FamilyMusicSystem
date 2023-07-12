import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public user: User;
  public resetForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: [''],
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  async submit() {
    this.user = new User();
    this.user.Username = this.resetForm.get('email')?.value;
    console.log("user: " + this.user.Username);

    try {
      const response = await this.http.post<any>('https://20231-familymusicsystem-production.up.railway.app/auth/forgot-password', {
        email: this.user.Username,
        url: 'https://20231-familymusicsystem-production.up.railway.app/admin/plugins/users-permissions/auth/reset-password',
      }).subscribe();
      console.log('Solicitação de redefinição de senha enviada com sucesso!');
    } catch (error) {
      console.error('Ocorreu um erro ao enviar a solicitação de redefinição de senha:', error);
    }
  }
}
