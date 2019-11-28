import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryCardDesktopComponent } from './enquiry-card-desktop.component';

describe('EnquiryCardDesktopComponent', () => {
  let component: EnquiryCardDesktopComponent;
  let fixture: ComponentFixture<EnquiryCardDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryCardDesktopComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryCardDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
