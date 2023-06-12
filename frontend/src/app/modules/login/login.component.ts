import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup;
  icon_now = 'brightness_2';
  icon = ['brightness_2', 'wb_sunny'];

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
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

  toggle() {
    const theme = document.body.classList.toggle('darkTheme');

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }

  public login(): void {
    this.user = new User();
    this.user.Username = this.loginForm.get('username')?.value;
    this.user.Password = this.loginForm.get('password')?.value;

    console.log("Username: " + this.user.Username + " Password: " + this.user.Password);

    this.http
      .post<any>('http://localhost:1337/api/auth/local', {
        identifier: this.user.Username,
        password: this.user.Password,
      })
      .subscribe(
        (response) => {
          console.log('User Profile', response.user);
          console.log('User Token', response.jwt);
          this.saveCookie('jwt', response.jwt);
          this.router.navigate(['/main/home']);
        },
        (error) => {
          console.log('An error occurred:', error);
        }
      );
  }
}
