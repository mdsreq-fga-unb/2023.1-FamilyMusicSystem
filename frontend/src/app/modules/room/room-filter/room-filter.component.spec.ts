import { ComponentFixture, TestBed } from '@angular/core/testing';

import { roomFilterComponent } from './room-filter.component';

describe('roomFilterComponent', () => {
  let component: roomFilterComponent;
  let fixture: ComponentFixture<roomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [roomFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(roomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
