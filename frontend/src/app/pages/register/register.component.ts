import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
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
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../auth/auth.service';

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
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

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

  constructor() {
    effect(() => {
      if (this.authService.isAuth()) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  handleSignUpWithEmail() {
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


  }

  handleLoginWithGoogle() {
    console.log('google');
  }

  handleLoginWithGithub() {
    console.log('github');
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
