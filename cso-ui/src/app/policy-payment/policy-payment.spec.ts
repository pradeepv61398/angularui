import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPayment } from './policy-payment';

describe('PolicyPayment', () => {
  let component: PolicyPayment;
  let fixture: ComponentFixture<PolicyPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
