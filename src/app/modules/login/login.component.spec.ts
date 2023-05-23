import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from './login.component';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponentComponent]
    });
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
