import {
  Injectable,
  OnDestroy,
  WritableSignal,
  signal,
  OnInit,
} from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Subscription,
  catchError,
  from,
  throwError,
  pipe,
  tap,
  Observable,
  map,
  take,
} from 'rxjs';

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
  authError: WritableSignal<string> = signal('');

  constructor(private auth: Auth, private router: Router) {}

  authenticated(): Observable<boolean> {
    return this.auth$.pipe(
      map((user) => {
        return !!user;
      }),
      take(1)
    );
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
    this.authError.set('');

    from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError((error) => {
          return this.handleAuthError(error);
        })
      )
      .subscribe((userCred) => {
        this.router.navigate(['overview']);
      });
  }

  loginWithEmail(email: string, password: string) {
    this.authError.set('');

    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError((error) => {
          return this.handleAuthError(error);
        })
      )
      .subscribe((userCred) => {
        this.router.navigate(['overview']);
      });
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

  logout() {
    signOut(this.auth);
  }
}
