import { TestBed } from '@angular/core/testing';

import { SharedBadgeDataService } from './shared-badge-data.service';

describe('SharedBadgeDataService', () => {
  let service: SharedBadgeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedBadgeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
