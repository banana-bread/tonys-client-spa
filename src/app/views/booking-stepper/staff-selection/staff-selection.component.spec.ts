import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSelectionComponent } from './staff-selection.component';

describe('StaffSelectionComponent', () => {
  let component: StaffSelectionComponent;
  let fixture: ComponentFixture<StaffSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
