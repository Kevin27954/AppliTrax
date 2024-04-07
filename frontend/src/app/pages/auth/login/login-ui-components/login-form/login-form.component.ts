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
import { LoginFormData } from '../../login-util/login';
import {
  checkEmailRegex,
  checkPasswordRegex,
} from '../../../auth-util/auth-util';
import { InputTextModule } from 'primeng/inputtext';

type fieldClassType = 'ng-invalid ng-dirty' | '';

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

  submitEmailFormData() {
    let emailRegexResult = checkEmailRegex(this.formGroup.value.email);
    let passwordRegexResult = checkPasswordRegex(this.formGroup.value.password);
    this.emailClassName = emailRegexResult ? '' : 'ng-invalid ng-dirty';
    this.passwordClassName = passwordRegexResult ? '' : 'ng-invalid ng-dirty';

    if (emailRegexResult && passwordRegexResult) {
      this.emailFormEmitter.emit(this.formGroup);
    }
  }

  submitGoogleAuth() {
    this.thirdPartyAuthEmitter.emit('google');
  }

  submitGithubAuth() {
    this.thirdPartyAuthEmitter.emit('github');
  }

  forgotPassword() {
    this.forgotPasswordEmitter.emit();
  }
}
