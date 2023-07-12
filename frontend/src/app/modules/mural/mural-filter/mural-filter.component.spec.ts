import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuralFilterComponent } from './mural-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MuralFilterComponent', () => {
  let component: MuralFilterComponent;
  let fixture: ComponentFixture<MuralFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralFilterComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuralFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
