import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import axios from "axios";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "src/app/models/user";


@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})

export class ResetPasswordComponent {
  [x: string]: any;
  public loginForm: FormGroup;
  public resetForm: FormGroup;
  private bsModalRef: BsModalRef;
  public show: boolean = false;
  public showConf: boolean = false;
  public loading: boolean = false;
  icon_now = "brightness_2";
  icon = ["brightness_2", "wb_sunny"];
  public isOpen = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      code: [""],
      password: [""],
      confirmPassword: [""],
    });
  }

  password() {
    this.show = !this.show;
  }

  passwordConfirmation() {
    this.showConf = !this.showConf;
  }

  toggle() {
    const theme = document.body.classList.toggle("darkTheme");

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }

  send() {

    var code = this.resetForm.get("code")?.value;
    var password = this.resetForm.get("password")?.value;


    // Request API.
    console.log("code: " + code + "\npassword: " + password + "\n passwordConfirmation: " + password);
    axios
      .post('https://20231-familymusicsystem-production.up.railway.app/api/auth/reset-password', {
        code: code,
        password: password,
        passwordConfirmation: password,
      })
      .then(response => {
        console.log("Your user's password has been reset.");
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }

  modalForgotPassword() {
    console.log("modalForgotPassword()");
  }
}
