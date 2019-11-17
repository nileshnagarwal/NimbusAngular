import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirySummaryCardComponent } from './enquiry-summary-card.component';

describe('EnquirySummaryCardComponent', () => {
  let component: EnquirySummaryCardComponent;
  let fixture: ComponentFixture<EnquirySummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquirySummaryCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirySummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
