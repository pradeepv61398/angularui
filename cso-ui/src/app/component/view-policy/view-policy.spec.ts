import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicy } from './view-policy';

describe('ViewPolicy', () => {
  let component: ViewPolicy;
  let fixture: ComponentFixture<ViewPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
