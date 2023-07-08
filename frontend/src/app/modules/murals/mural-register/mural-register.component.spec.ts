import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralRegisterComponent } from './mural-register.component';

describe('MuralRegisterComponent', () => {
  let component: MuralRegisterComponent;
  let fixture: ComponentFixture<MuralRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralRegisterComponent ]
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
