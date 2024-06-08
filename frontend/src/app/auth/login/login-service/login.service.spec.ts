import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { environment } from '../../../../environments/environment.development';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
