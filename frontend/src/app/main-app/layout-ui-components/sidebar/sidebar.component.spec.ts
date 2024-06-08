import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { AuthService } from '../../../auth/auth.service';
import { inject } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { environment } from '../../../../environments/environment';
import { RegisterService } from '../../../auth/register/register-service/register.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let auth: AuthService;
  let register: RegisterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterLinkActive,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
          const auth = getAuth();
          if (!environment.prod) {
            connectAuthEmulator(auth, 'http://localhost:9099', {
              disableWarnings: true,
            });
          }
          return auth;
        }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock any properties or methods you need
            snapshot: { data: {} },
            paramMap: {},
            queryParamMap: {},
            params: {},
          },
        },
        AuthService,
        RegisterService,
      ],
    }).compileComponents();

    register = TestBed.inject(RegisterService);
    auth = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show links as highlighted', async () => {
    let compiled = fixture.nativeElement;
    const application_href = compiled.querySelector(
      '[data-test="application-href"]',
    );

    application_href.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(application_href.classList[0]).toContain('active-link');

    // Job Board
    compiled = fixture.nativeElement;
    const job_board_href = compiled.querySelector(
      '[data-test="job-boards-href"]',
    );

    job_board_href.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(job_board_href.classList[0]).toContain('active-link');

    // Trending
    compiled = fixture.nativeElement;
    const trending_href = compiled.querySelector('[data-test="trending-href"]');

    trending_href.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(trending_href.classList[0]).toContain('active-link');

    // Overview
    compiled = fixture.nativeElement;
    const overview_href = compiled.querySelector('[data-test="overview-href"]');

    overview_href.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(overview_href.classList[0]).toContain('active-link');
  });
});
