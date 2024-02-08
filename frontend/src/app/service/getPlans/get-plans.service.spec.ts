import { TestBed } from '@angular/core/testing';

import { GetPlansService } from './get-plans.service';

describe('GetPlansService', () => {
  let service: GetPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
