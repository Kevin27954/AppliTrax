import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LoginFormData, fieldClassType } from '../../login-util/login';
import {
  checkEmailRegex,
  checkPasswordRegex,
} from '../../../auth-util/auth-util';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  formGroup: FormGroup<LoginFormData> = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    checked: new FormControl(),
  });

  emailClassName: fieldClassType | undefined;
  emailRegexResult = true;
  passwordClassName: fieldClassType | undefined;
  passwordRegexResult = true;

  @Output() emailFormEmitter = new EventEmitter<FormGroup<LoginFormData>>();
  @Output() thirdPartyAuthEmitter = new EventEmitter<string>();
  @Output() forgotPasswordEmitter = new EventEmitter<string>();

  emitEmailFormData() {
    this.emailRegexResult = checkEmailRegex(this.formGroup.value.email);
    this.passwordRegexResult = checkPasswordRegex(
      this.formGroup.value.password
    );
    this.emailClassName = this.emailRegexResult ? '' : 'ng-invalid ng-dirty';
    this.passwordClassName = this.passwordRegexResult
      ? ''
      : 'ng-invalid ng-dirty';

    if (this.emailRegexResult && this.passwordRegexResult) {
      this.emailFormEmitter.emit(this.formGroup);
    }
  }

  emitGoogleAuth() {
    this.thirdPartyAuthEmitter.emit('google');
  }

  emitGithubAuth() {
    this.thirdPartyAuthEmitter.emit('github');
  }

  emitForgotPassword() {
    this.forgotPasswordEmitter.emit();
  }
}
