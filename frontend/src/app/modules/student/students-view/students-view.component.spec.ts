import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StudentsViewComponent } from './students-view.component';

describe('StudentsViewComponent', () => {
  let component: StudentsViewComponent;
  let fixture: ComponentFixture<StudentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsViewComponent],
      providers: [BsModalService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
