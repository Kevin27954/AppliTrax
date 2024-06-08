import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be at overview initally', () => {
    const router = TestBed.inject(Router);
    router.navigate(['/dashboard']);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const headerBreadCrumb = compiled.querySelector(
      "[data-test='header-breadcrumb']",
    );

    expect(headerBreadCrumb.textContent).toContain('Overview');
  });
});
