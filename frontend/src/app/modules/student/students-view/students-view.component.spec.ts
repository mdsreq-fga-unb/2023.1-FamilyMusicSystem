import { Student } from "../../../models/student";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { BsModalService } from "ngx-bootstrap/modal";
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { StudentsViewComponent } from "./students-view.component";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("StudentsViewComponent", () => {
  let component: StudentsViewComponent;
  let fixture: ComponentFixture<StudentsViewComponent>;

  beforeEach(async () => {
    const student = new Student();
    await TestBed.configureTestingModule({
      declarations: [StudentsViewComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        BsModalService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        HttpHandler,
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsViewComponent);
    component = fixture.componentInstance;
    component.student = student;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
