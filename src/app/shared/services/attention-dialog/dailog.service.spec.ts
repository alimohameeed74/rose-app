/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailogService } from './dailog.service';

describe('Service: Dailog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailogService]
    });
  });

  it('should ...', inject([DailogService], (service: DailogService) => {
    expect(service).toBeTruthy();
  }));
});
