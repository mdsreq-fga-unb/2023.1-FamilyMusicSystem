import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsRegisterComponent } from './rooms-register.component';

describe('RoomsRegisterComponent', () => {
  let component: RoomsRegisterComponent;
  let fixture: ComponentFixture<RoomsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsRegisterComponent ]
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
