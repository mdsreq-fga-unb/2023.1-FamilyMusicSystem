import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomFilterComponent } from './room-filter.component';

describe('RoomFilterComponent', () => {
  let component: RoomFilterComponent;
  let fixture: ComponentFixture<RoomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomFilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
