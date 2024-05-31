import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardToolbarComponent } from './job-board-toolbar.component';

describe('JobBoardToolbarComponent', () => {
  let component: JobBoardToolbarComponent;
  let fixture: ComponentFixture<JobBoardToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBoardToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobBoardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
