import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../template/footer/footer.component';
import { AppModule } from '../../app.module';
import { CookieService } from '../../services/cookie.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, FooterComponent],
      providers: [BsModalService, CookieService],
      imports: [MatIconModule, AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
