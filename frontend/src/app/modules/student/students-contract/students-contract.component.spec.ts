import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsContractComponent } from './students-contract.component';

describe('StudentsContractComponent', () => {
  let component: StudentsContractComponent;
  let fixture: ComponentFixture<StudentsContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
