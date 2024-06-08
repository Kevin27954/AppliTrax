import { TestBed } from '@angular/core/testing';

import { TrendingService } from './trending.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrendingService', () => {
  let service: TrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
