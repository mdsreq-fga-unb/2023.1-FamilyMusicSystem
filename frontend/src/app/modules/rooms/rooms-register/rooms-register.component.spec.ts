import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsRegisterComponent } from './rooms-register.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoomsRegisterComponent', () => {
  let component: RoomsRegisterComponent;
  let fixture: ComponentFixture<RoomsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsRegisterComponent ],
      providers: [BsModalService],
      imports: [MatIconModule, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
