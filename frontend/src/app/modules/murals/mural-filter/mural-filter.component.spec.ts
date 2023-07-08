import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralFilterComponent } from './mural-filter.component';

describe('MuralFilterComponent', () => {
  let component: MuralFilterComponent;
  let fixture: ComponentFixture<MuralFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralFilterComponent ]
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
