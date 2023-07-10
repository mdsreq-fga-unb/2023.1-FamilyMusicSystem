import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuralRegisterComponent } from './mural-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MuralRegisterComponent', () => {
  let component: MuralRegisterComponent;
  let fixture: ComponentFixture<MuralRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralRegisterComponent ],
      providers: [BsModalService, HttpClient, HttpHandler],
      imports: [MatIconModule, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuralRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
