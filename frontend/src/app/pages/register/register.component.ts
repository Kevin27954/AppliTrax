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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
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
  emailSmallClassName: string = 'hide';
  passwordClassName: string = '';
  passwordSmallClassName: string = 'hide';
  passwordSmallText: string = '';

  authServiceErr: WritableSignal<string> = this.authService.authError;

  constructor(private authService: AuthService) {}

  handleSignUpWithEmail() {
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
    } else if (
      this.formGroup.value.password != this.formGroup.value.confirmPassword
    ) {
      this.passwordClassName = 'ng-invalid ng-dirty';
      this.passwordSmallClassName = '';
      this.passwordSmallText = 'Not Equal Password';
    } else {
      this.passwordClassName = 'ng-invalid ng-dirty';
      this.passwordSmallClassName = '';
      this.passwordSmallText = 'Weak Password';
    }

    if (emailRegexTest && passwordRegexTest) {
      this.authService.signUpWithEmail(
        this.formGroup.value.email!,
        this.formGroup.value.password!
      );
    }
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      checked: new FormControl(false),
    });
  }
}
