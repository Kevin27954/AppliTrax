import { Component, OnInit, WritableSignal } from '@angular/core';
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
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessagesModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formGroup!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    checked: FormControl<boolean | null>;
  }>;

  emailClassName: string = '';
  emailRegexResult: boolean = true;
  passwordClassName: string = '';
  passwordRegexResult: boolean = true;
  passwordSmallText: string = '';
  isSamePassword: boolean = true;

  authServiceErr: WritableSignal<Message[]> = this.authService.authError;

  constructor(private authService: AuthService, private router: Router) {}

  handleSignUpWithEmail() {
    this.emailRegexResult = this.authService.checkEmailRegex(
      this.formGroup.value.email!
    );
    this.passwordRegexResult = this.authService.checkPasswordRegex(
      this.formGroup.value.password!
    );
    this.isSamePassword =
      this.formGroup.value.password == this.formGroup.value.confirmPassword;

    this.emailClassName = this.emailRegexResult ? '' : 'ng-invalid ng-dirty';

    this.passwordClassName =
      this.passwordRegexResult && this.isSamePassword
        ? ''
        : 'ng-invalid ng-dirty';

    this.passwordSmallText = this.isSamePassword
      ? 'Weak Password'
      : 'Not Equal Password';

    if (
      this.emailRegexResult &&
      this.passwordRegexResult &&
      this.isSamePassword
    ) {
      this.authService
        .signUpWithEmail(
          this.formGroup.value.email!,
          this.formGroup.value.password!
        )
        .subscribe(() => {
          this.router.navigate(['overview']);
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
      confirmPassword: new FormControl(''),
      checked: new FormControl(false),
    });

    if(this.authService.isAuth()) {
      this.router.navigate(['dashboard'])
    }

    this.authServiceErr.set([]);
  }
}
