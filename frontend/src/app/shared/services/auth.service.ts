import {
  Injectable,
  WritableSignal,
  signal,
  OnInit,
  computed,
} from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, from, throwError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const emailRegex: RegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordMediumRegex: RegExp =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const passwordStrongRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth$ = authState(this.auth);
  user: WritableSignal<User | null> = signal(null);
  isAuth = computed(() => !!this.user());

  authError: WritableSignal<string> = signal('');

  constructor(private auth: Auth, private router: Router) {
    this.auth$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.user.set(user);
    });
  }

  refreshToken() {
    this.auth.currentUser?.getIdToken();
  }

  checkEmailRegex(email: string) {
    return emailRegex.test(email);
  }

  checkPasswordRegex(password: string) {
    return (
      passwordMediumRegex.test(password) || passwordStrongRegex.test(password)
    );
  }

  signUpWithEmail(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap(() => this.authError.set('')),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  loginWithEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(() => this.authError.set('')),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  signUpWithGoogle() {
    console.log('Signing up with google');
  }

  signUpWithGitHub() {
    console.log('Signing up in with github');
  }

  loginWithGoogle() {
    console.log('Logging in with google');
  }

  loginWithGithub() {
    console.log('Logging in with github');
  }

  forgotPassword() {
    console.log('Handling forgot password users');
  }

  logout() {
    signOut(this.auth);
  }

  handleAuthError(error: any) {
    let errMessage = this.handleErrorCode(error);
    this.authError.set(errMessage);
    return throwError(() => new Error(errMessage));
  }

  handleErrorCode(error: any) {
    if (error.code == 'auth/user-not-found') {
      return 'User not Found';
    } else if (error.code == 'auth/wrong-password') {
      return 'Incorrect Credentials';
    } else if (error.code == 'auth/network-request-failed') {
      return 'Auth Server Not up';
    } else {
      return 'Login Failed' + error.code;
    }
  }
}
