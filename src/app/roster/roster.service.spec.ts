import { TestBed } from '@angular/core/testing';

import { RosterService } from './roster.service';

describe('ExampleService', () => {
  let service: RosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
