import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {
  RegisterFormData,
  fieldClassType,
  passwordHelpText,
} from '../register-util/register';
import { checkEmailRegex, checkPasswordRegex } from '../../auth-util/auth-util';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  formGroup: FormGroup<RegisterFormData> = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    checked: new FormControl(),
  });

  emailClassName: fieldClassType | undefined;
  emailRegexResult: boolean = true;
  passwordClassName: fieldClassType | undefined;
  passwordRegexResult: boolean = true;
  passwordSmallText: passwordHelpText | undefined;
  isSamePassword: boolean = true;

  @Output() emailFormEmitter = new EventEmitter<FormGroup<RegisterFormData>>();
  @Output() thirdPartyAuthEmitter = new EventEmitter<string>();

  emitEmailFormData() {
    this.emailRegexResult = checkEmailRegex(this.formGroup.value.email);
    this.passwordRegexResult = checkPasswordRegex(
      this.formGroup.value.password
    );
    this.isSamePassword =
      this.formGroup.value.password == this.formGroup.value.confirmPassword;

    this.emailClassName = this.emailRegexResult ? '' : 'ng-invalid ng-dirty';
    this.passwordClassName = this.passwordRegexResult
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
      this.emailFormEmitter.emit(this.formGroup);
    }
  }

  emitGoogleAuth() {
    this.thirdPartyAuthEmitter.emit('google');
  }

  emitGithubAuth() {
    this.thirdPartyAuthEmitter.emit('github');
  }
}
