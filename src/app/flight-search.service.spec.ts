import { TestBed, inject } from '@angular/core/testing';

import { FlightSearchService } from './flight-search.service';

describe('FlightSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightSearchService]
    });
  });

  it('should be created', inject([FlightSearchService], (service: FlightSearchService) => {
    expect(service).toBeTruthy();
  }));
});
