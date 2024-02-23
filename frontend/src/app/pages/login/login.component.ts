import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formGroup!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    checked: FormControl<boolean | null>;
  }>;
  checked: boolean = false;

  emailClassName: string = '';
  emailSmallClassName: string = 'hide';
  passwordClassName: string = '';
  passwordSmallClassName: string = 'hide';

  constructor(private authService: AuthService) {}

  handleForgotPassword() {
    this.authService.forgotPassword();
  }

  handleLoginWithEmail() {
    let emailRegexTest: boolean = this.authService.checkEmailRegex(
      this.formGroup.value.email!
    );
    let passwordRegexTest: boolean = this.authService.checkPasswordRegex(
      this.formGroup.value.password!
    );

    if (emailRegexTest) {
      this.emailSmallClassName = 'hide';
      this.emailClassName = '';
    } else {
      this.emailClassName = 'ng-invalid ng-dirty';
      this.emailSmallClassName = '';
    }

    if (passwordRegexTest) {
      this.passwordClassName = '';
      this.passwordSmallClassName = 'hide';
    } else {
      this.passwordClassName = 'ng-invalid ng-dirty';
      this.passwordSmallClassName = '';
    }

    if (emailRegexTest && passwordRegexTest) {
      this.authService.loginWithEmail(
        this.formGroup.value.email!,
        this.formGroup.value.password!
      );
    }
  }

  handleLoginWithGoogle() {
    this.authService.loginWithGoogle();
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
  }
}
