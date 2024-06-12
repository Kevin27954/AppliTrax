import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Message } from 'primeng/api';
import { handleErrorCode } from '../../auth-util/auth-util';
import { ApiService } from '../../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  auth: Auth = inject(Auth);
  api: ApiService = inject(ApiService);
  authError: WritableSignal<Message[]> = signal([]);

  handleAuthError(error: any) {
    let errMessage = handleErrorCode(error);
    this.authError.set([errMessage]);
  }

  loginWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.api.loginUser().subscribe();
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
        if (
          this.auth.currentUser?.metadata.creationTime ===
          this.auth.currentUser?.metadata.lastSignInTime
        ) {
          this.api.registerUser().subscribe();
        } else {
          this.api.loginUser().subscribe();
        }
        this.authError.set([]);
      })
      .catch((error) => {
        return this.handleAuthError(error);
      });
  }

  handleSignInWithGithub() {
    console.log('Logging in with github');
  }

  forgotPassword() {
    console.log('Handling forgot password users');
  }
}
