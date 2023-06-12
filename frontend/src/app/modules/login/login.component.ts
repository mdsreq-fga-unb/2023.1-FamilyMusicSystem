import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import axios from 'axios';
import { User } from 'src/app/models/user';
import { CookieService } from 'src/app/service/cookie.service';

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

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
    this.cookieService.setCookie('jwtToken', 'seuTokenJWT');
    const token = this.cookieService.getCookie('jwtToken');
    console.log('Token JWT:', token);
    this.cookieService.deleteCookie('jwtToken');
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

    axios.post('http://localhost:1337/api/auth/local', {
      identifier: this.user.Username,
      password: this.user.Password
    }).then(response => {
      console.log('User Profile', response.data.user);
      console.log('User Token', response.data.jwt);
    }).catch(error => {
      console.log('An error occurred:', error.response)
    })
  }

}
