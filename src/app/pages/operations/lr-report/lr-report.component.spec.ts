import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrReportComponent } from './lr-report.component';

describe('LrReportComponent', () => {
  let component: LrReportComponent;
  let fixture: ComponentFixture<LrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrReportComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
