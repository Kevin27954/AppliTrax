import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Message } from 'primeng/api';
import { handleErrorCode } from '../../auth-util/auth-util';
import { ApiService } from '../../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  auth: Auth = inject(Auth);
  api: ApiService = inject(ApiService);
  authError: WritableSignal<Message[]> = signal([]);

  handleAuthError(error: any) {
    let errMessage = handleErrorCode(error);
    this.authError.set([errMessage]);
  }

  signUpWithEmail(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.api.registerUser().subscribe();
        this.authError.set([]);
      })
      .catch((error) => {
        return this.handleAuthError(error);
      });
  }

  handleSignInWithGoogle() {
    let provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    signInWithPopup(this.auth, provider)
      .then(() => {
        this.api.registerUser().subscribe();
        this.authError.set([]);
      })
      .catch((error) => {
        return this.handleAuthError(error);
      });
  }

  handleSignInWithGithub() {
    console.log('Logging in with github');
  }
}
