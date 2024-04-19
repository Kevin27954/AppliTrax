import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliCardModalComponent } from './appli-card-modal.component';

describe('AppliCardModalComponent', () => {
  let component: AppliCardModalComponent;
  let fixture: ComponentFixture<AppliCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliCardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
