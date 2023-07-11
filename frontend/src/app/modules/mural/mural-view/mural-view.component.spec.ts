import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuralViewComponent } from './mural-view.component';
import { BsModalService } from "ngx-bootstrap/modal";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Mural } from '../../../models/mural';

describe('MuralViewComponent', () => {
  let component: MuralViewComponent;
  let fixture: ComponentFixture<MuralViewComponent>;

  beforeEach(async () => {
    const mural: Mural = new Mural();
    await TestBed.configureTestingModule({
      declarations: [ MuralViewComponent ],
      providers: [BsModalService, HttpClient, HttpHandler],
      imports: [MatIconModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuralViewComponent);
    component = fixture.componentInstance;
    component.mural = mural;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
