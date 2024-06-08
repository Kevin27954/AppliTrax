import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
