import { TestBed } from '@angular/core/testing';

import { LrService } from './lr.service';

describe('LrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LrService = TestBed.get(LrService);
    expect(service).toBeTruthy();
  });
});
