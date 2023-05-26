import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersRegisterComponent } from './teachers-register.component';

describe('TeachersRegisterComponent', () => {
  let component: TeachersRegisterComponent;
  let fixture: ComponentFixture<TeachersRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
