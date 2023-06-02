import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeachersListComponent } from './teachers-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/models/teacher';

describe('TeachersListComponent', () => {
  let component: TeachersListComponent;
  let fixture: ComponentFixture<TeachersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachersListComponent],
      providers: [BsModalService],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});