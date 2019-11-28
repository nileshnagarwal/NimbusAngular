import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryCardMobileComponent } from './enquiry-card-mobile.component';

describe('EnquiryCardMobileComponent', () => {
  let component: EnquiryCardMobileComponent;
  let fixture: ComponentFixture<EnquiryCardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryCardMobileComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
