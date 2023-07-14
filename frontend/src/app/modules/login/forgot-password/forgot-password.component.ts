import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import axios from 'axios';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public user: User;
  public resetForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private bsModalRef: BsModalRef,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

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
    this.loading = true;
    this.user.Username = this.resetForm.get('email')?.value;
    console.log('user: ' + this.user.Username);

    // Request API.
    axios
      .post('https://20231-familymusicsystem-production.up.railway.app/api/auth/forgot-password', {
        email: this.user.Username,
        // url: 'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password',
      })
      .then((response) => {
        console.log('Your user received an email');
        this.loading = false;
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
        this.loading = false;
      });
  }
}
