import { Component, inject } from '@angular/core';
import { RegisterFormComponent } from './register-ui-component/register-form.component';
import { RegisterService } from './register-service/register.service';
import { RegisterFormData } from './register-util/register';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [RegisterFormComponent],
})
export class RegisterComponent {
  registerService: RegisterService = inject(RegisterService);

  handleEmailFormEmit(emailFormData: FormGroup<RegisterFormData>) {
    this.registerService.signUpWithEmail(
      emailFormData.value.email,
      emailFormData.value.password
    );
  }

  handleThirdPartyAuthEmit(provider: string) {
    switch (provider) {
      case 'google':
        this.registerService.handleSignInWithGoogle();
        break;
      case 'github':
        this.registerService.handleSignInWithGithub();
        break;
      default:
        console.log('No Such Provider!');
        break;
    }
  }
}
