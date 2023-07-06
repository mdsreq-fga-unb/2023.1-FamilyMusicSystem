import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { subYears, format } from "date-fns";

@Component({
  selector: "app-room-filter",
  templateUrl: "./room-filter.component.html",
  styleUrls: ["./room-filter.component.scss"],
})
export class RoomFilterComponent implements OnInit {
  public onClose: Subject<any> = new Subject<any>();
  public edicao = false;
  public location = false;
  public inicial = true;
  public Resp = false;
  public numreq = 0;
  public roomFilterForm: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.roomFilterForm = this.fb.group({
      createdAt: null,
      numberRoomFilter: null,
    });
  }

  exit() {
    this.bsModalRef.hide();
  }

  filter() {
    const formValues = this.roomFilterForm.value;
    const filters = [];
    this.numreq = 0;

    if (formValues.createdAt !== null) {
      filters.push(`sort[${this.numreq}]=createdAt:${formValues.createdAt}`);
      this.numreq++;
    }

    const urlParams = filters.join("&");
    const url = `?${urlParams}`;

    this.onClose.next(url);
    this.bsModalRef.hide();
  }
}
