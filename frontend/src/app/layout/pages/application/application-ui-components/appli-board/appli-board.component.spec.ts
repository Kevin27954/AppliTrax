import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliBoardComponent } from './appli-board.component';

describe('AppliBoardComponent', () => {
  let component: AppliBoardComponent;
  let fixture: ComponentFixture<AppliBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
