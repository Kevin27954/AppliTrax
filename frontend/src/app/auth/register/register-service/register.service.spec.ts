import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment.development';
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  provideAuth,
} from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(
          provideFirebaseApp(() => initializeApp(environment.firebase)),
        ),
        importProvidersFrom(
          provideAuth(() => {
            const auth = getAuth();
            if (!environment.prod) {
              connectAuthEmulator(auth, 'http://localhost:9099', {
                disableWarnings: true,
              });
            }
            return auth;
          }),
        ),
      ],
    });

    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user with email and password', async () => {
    const email = generateRandomString(10) + '@gmail.com';
    const password = 'tset123asDFsd.';

    spyOn(service, 'signUpWithEmail').and.callThrough();

    service.signUpWithEmail(email, password);

    expect(service.authError()).toEqual([]);
    expect(service.signUpWithEmail).toHaveBeenCalledOnceWith(email, password);

    const auth = TestBed.inject(Auth);

    await auth.authStateReady();
    const user = auth.currentUser;
    expect(user).not.toEqual(null);
  });
});

function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
