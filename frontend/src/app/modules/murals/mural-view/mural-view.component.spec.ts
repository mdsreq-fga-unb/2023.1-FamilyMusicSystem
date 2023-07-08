import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralViewComponent } from './mural-view.component';

describe('MuralViewComponent', () => {
  let component: MuralViewComponent;
  let fixture: ComponentFixture<MuralViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
