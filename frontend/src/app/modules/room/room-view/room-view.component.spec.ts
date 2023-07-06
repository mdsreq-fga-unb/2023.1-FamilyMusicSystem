import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoomViewComponent } from "./room-view.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Room } from "../../../models/room";

describe("RoomViewComponent", () => {
  let component: RoomViewComponent;
  let fixture: ComponentFixture<RoomViewComponent>;

  beforeEach(async () => {
    const room: Room = new Room();
    await TestBed.configureTestingModule({
      declarations: [RoomViewComponent],
      providers: [BsModalService, HttpClient, HttpHandler],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomViewComponent);
    component = fixture.componentInstance;
    component.room = room;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
