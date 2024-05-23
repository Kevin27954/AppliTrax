import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliInfoBoxComponent } from './appli-info-box.component';

describe('AppliInfoBoxComponent', () => {
  let component: AppliInfoBoxComponent;
  let fixture: ComponentFixture<AppliInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliInfoBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
