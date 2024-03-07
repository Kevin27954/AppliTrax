import {
  Component,
  OnInit,
  WritableSignal,
  OnDestroy,
  inject,
  effect,
} from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessagesModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);

  formGroup!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    checked: FormControl<boolean | null>;
  }>;

  authServiceErr: WritableSignal<Message[]> = this.authService.authError;

  emailClassName: string = '';
  emailRegexResult: boolean = true;
  passwordClassName: string = '';
  passwordRegexResult: boolean = true;

  constructor() {
    effect(() => {
      if (this.authService.isAuth()) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  handleForgotPassword() {
    this.authService.forgotPassword();
  }

  handleLoginWithEmail() {
    this.emailRegexResult = this.authService.checkEmailRegex(
      this.formGroup.value.email!
    );
    this.passwordRegexResult = this.authService.checkPasswordRegex(
      this.formGroup.value.password!
    );

    this.emailClassName = this.emailRegexResult ? '' : 'ng-invalid ng-dirty';
    this.passwordClassName = this.passwordRegexResult
      ? ''
      : 'ng-invalid ng-dirty';

    if (this.emailRegexResult && this.passwordRegexResult) {
      this.authService
        .loginWithEmail(
          this.formGroup.value.email!,
          this.formGroup.value.password!
        )
        .subscribe(() => {
          this.router.navigate(['dashboard']);
        });
    }
  }

  handleLoginWithGoogle() {
    this.authService.handleSignInWithGoogle().subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }

  handleLoginWithGithub() {
    this.authService.loginWithGithub();
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      checked: new FormControl(false),
    });

    this.authServiceErr.set([]);
  }

  ngOnDestroy() {}
}
