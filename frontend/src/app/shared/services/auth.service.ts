import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  OnDestroy,
} from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  catchError,
  from,
  tap,
  first,
  Subscription,
  EMPTY,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from 'primeng/api';

const emailRegex: RegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordMediumRegex: RegExp =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const passwordStrongRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  auth$ = authState(this.auth);
  authSubscription: Subscription | undefined;
  user: WritableSignal<User | null> = signal(null);
  isAuth = computed(() => !!this.user());

  authError: WritableSignal<Message[]> = signal([]);

  constructor(private auth: Auth) {
    this.authSubscription = this.auth$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
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
      first(),
      tap(() => this.authError.set([])),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  loginWithEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      first(),
      tap(() => this.authError.set([])),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  handleSignInWithGoogle() {
    let provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return from(signInWithPopup(this.auth, provider)).pipe(
      first(),
      tap(() => this.authError.set([])),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  signUpWithGitHub() {
    console.log('Signing up in with github');
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
    this.authError.set([errMessage]);
    return EMPTY;
  }

  handleErrorCode(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return {
          severity: 'error',
          summary: 'Error',
          detail: 'Incorrect Credentials',
        };
      case 'auth/network-request-failed':
        return {
          severity: 'error',
          summary: 'Error',
          detail: 'Auth Server Not up',
        };
      case 'auth/email-already-in-use':
        return {
          severity: 'error',
          summary: 'Error',
          detail: 'Email Already Taken',
        };
      default:
        return {
          severity: 'error',
          summary: 'Error',
          detail: 'Login Failed ' + error.code,
        };
    }
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
