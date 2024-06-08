import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment.development';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { ActivatedRoute } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
