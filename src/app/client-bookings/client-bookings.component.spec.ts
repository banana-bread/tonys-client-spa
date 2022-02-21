import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBookingsComponent } from './client-bookings.component';

describe('ClientBookingsComponent', () => {
  let component: ClientBookingsComponent;
  let fixture: ComponentFixture<ClientBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
