import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsFilterComponent } from './rooms-filter.component';

describe('RoomsFilterComponent', () => {
  let component: RoomsFilterComponent;
  let fixture: ComponentFixture<RoomsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
