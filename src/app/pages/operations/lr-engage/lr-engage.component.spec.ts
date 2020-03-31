import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrEngageComponent } from './lr-engage.component';

describe('LrEngageComponent', () => {
  let component: LrEngageComponent;
  let fixture: ComponentFixture<LrEngageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrEngageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrEngageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
