import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeachersFilterComponent } from './teachers-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TeachersFilterComponent', () => {
  let component: TeachersFilterComponent;
  let fixture: ComponentFixture<TeachersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersFilterComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
