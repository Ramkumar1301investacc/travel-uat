import { TestBed } from '@angular/core/testing';

import { GetcountriesService } from './getcountries.service';

describe('GetcountriesService', () => {
  let service: GetcountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
