import { TestBed } from '@angular/core/testing';

import { JobBoardService } from './job-board.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JobBoardService', () => {
  let service: JobBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(JobBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
