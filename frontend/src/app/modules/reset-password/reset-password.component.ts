import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "src/app/models/user";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent {
  public user: User;
  public loginForm: FormGroup;
  private bsModalRef: BsModalRef;
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
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [""],
    });
  }

  toggle() {
    const theme = document.body.classList.toggle("darkTheme");

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }

  login() {
    console.log("Login()");
  }

  modalForgotPassword() {
    console.log("modalForgotPassword()");
  }
}
