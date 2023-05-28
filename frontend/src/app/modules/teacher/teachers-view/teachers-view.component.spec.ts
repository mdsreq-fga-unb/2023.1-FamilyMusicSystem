import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersViewComponent } from './teachers-view.component';

describe('TeachersViewComponent', () => {
  let component: TeachersViewComponent;
  let fixture: ComponentFixture<TeachersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
