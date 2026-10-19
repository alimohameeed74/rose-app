/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OccasionService } from './occasion.service';

describe('Service: Occasion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccasionService]
    });
  });

  it('should ...', inject([OccasionService], (service: OccasionService) => {
    expect(service).toBeTruthy();
  }));
});
