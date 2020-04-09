import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrViewComponent } from './lr-view.component';

describe('LrViewComponent', () => {
  let component: LrViewComponent;
  let fixture: ComponentFixture<LrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
