import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordComponent } from "./reset-password.component";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { BsModalService } from "ngx-bootstrap/modal";
import { MatDialogModule } from "@angular/material/dialog";

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      providers: [
        BsModalService,
        HttpClient,
        HttpHandler,
        MatDialogModule,
        MatIconModule,
      ],
      imports: [MatIconModule, ReactiveFormsModule, MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
