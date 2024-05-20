import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  OnDestroy,
  inject,
} from '@angular/core';
import { Auth, User, authState, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  auth: Auth = inject(Auth);
  auth$ = authState(this.auth);
  authSubscription: Subscription | undefined;
  user: WritableSignal<User | null> = signal(null);
  isAuth = computed(() => !!this.user());

  constructor() {
    this.authSubscription = this.auth$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.user.set(user);
      });
  }

  getToken() {
    return this.auth.currentUser?.getIdToken() || Promise.resolve('');
  }

  signUpWithEmail(email: string, password: string) {
    console.log('temp auth sign up');
  }

  logout() {
    signOut(this.auth);
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
