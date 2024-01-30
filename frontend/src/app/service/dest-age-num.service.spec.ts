import { TestBed } from '@angular/core/testing';

import { DestAgeNumService } from './dest-age-num.service';

describe('DestAgeNumService', () => {
  let service: DestAgeNumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestAgeNumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
