import { Component, WritableSignal, effect, inject } from '@angular/core';
import { LoginService } from './login-service/login.service';
import { LoginFormComponent } from './login-ui-components/login-form/login-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { LoginFormData } from './login-util/login';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [LoginFormComponent, ProgressSpinnerModule, MessagesModule],
})
export class LoginComponent {
  loginService: LoginService = inject(LoginService);
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  authServiceErr: WritableSignal<Message[]> = this.loginService.authError;

  constructor() {
    effect(() => {
      if (this.auth.isAuth()) {
        this.router.navigate(['/dashboard/overview']);
      }
    });
  }

  handleEmailFormEmit(emailFormData: FormGroup<LoginFormData>) {
    this.loginService.loginWithEmail(
      emailFormData.value.email,
      emailFormData.value.password
    );
  }

  handleThirdPartyAuthEmit(provider: string) {
    switch (provider) {
      case 'google':
        this.loginService.handleSignInWithGoogle();
        break;
      case 'github':
        this.loginService.handleSignInWithGithub();
        break;
      default:
        console.log('No Such Provider!');
        break;
    }
  }

  handleForgotPasswordEmit() {}
}
