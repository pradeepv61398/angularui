import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSubmissionComponent } from './claim-submission-component';

describe('ClaimSubmissionComponent', () => {
  let component: ClaimSubmissionComponent;
  let fixture: ComponentFixture<ClaimSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
