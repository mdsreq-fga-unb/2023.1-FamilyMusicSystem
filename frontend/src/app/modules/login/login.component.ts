import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from '../../models/user';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '(window:keydown)': 'handleKeyDown($event)',
  },
})

export class LoginComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup;
  private bsModalRef: BsModalRef;
  public loading: boolean = false;
  icon_now = 'brightness_2';
  icon = ['brightness_2', 'wb_sunny'];
  public isOpen = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public saveCookie(key: string, values: string) {
    this.cookieService.setCookie(key, values);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  modalForgotPassword(user: User) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        user: User,
      },
      class: "modal-lg",
    };
    this.bsModalRef = this.modalService.show(ForgotPasswordComponent);
    this.bsModalRef.onHide?.subscribe(() => { });
  }

  toggle() {
    const theme = document.body.classList.toggle('darkTheme');

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  public login(): void {
    this.user = new User();
    this.user.Username = this.loginForm.get('username')?.value;
    this.user.Password = this.loginForm.get('password')?.value;
    this.loading = true;
    this.http
      .post<any>(
        'https://20231-familymusicsystem-production.up.railway.app/api/auth/local',
        {
          identifier: this.user.Username,
          password: this.user.Password,
        }
      )
      .subscribe(
        (response) => {
          this.saveCookie('jwt', response.jwt);
          this.router.navigate(['/main/home']);
        },
        (error) => {
          console.log('An error occurred:', error);
          console.log('error');
          this.loading = false;
          if (this.isOpen == false) {
            this.isOpen = true;
            const dialogRef: MatDialogRef<AlertComponent> = this.dialog.open(
              AlertComponent,
              {
                data: {
                  message:
                    'Certifique-se que usuário e senha foram digitados corretamente.',
                  dialogRef: null,
                },
              }
            );
            dialogRef.componentInstance.dialogRef = dialogRef;

            dialogRef.componentInstance.confirmed.subscribe(
              (result: boolean) => {
                if (result) {
                  this.isOpen = false;
                }
              }
            );
          }
        }
      );
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.login();
  }
}
