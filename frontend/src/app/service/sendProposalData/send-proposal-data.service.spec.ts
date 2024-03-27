import { TestBed } from '@angular/core/testing';

import { SendProposalDataService } from './send-proposal-data.service';

describe('SendProposalDataService', () => {
  let service: SendProposalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendProposalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
