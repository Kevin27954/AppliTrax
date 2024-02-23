import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  emailRegex: RegExp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  passwordMediumRegex: RegExp =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  passwordStrongRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  constructor() {}

  checkEmailRegex(email: string) {
    return this.emailRegex.test(email);
  }

  checkPasswordRegex(password: string) {
    return (
      this.passwordMediumRegex.test(password) ||
      this.passwordStrongRegex.test(password)
    );
  }

  signUpWithEmail(email: string, password: string) {
    console.log(`Signing Up with ${email} and ${password}`);
  }

  signUpWithGoogle() {
    console.log('Signing up with google');
  }

  signUpWithGitHub() {
    console.log('Signing up in with github');
  }

  loginWithEmail(email: string, password: string) {
    console.log(`Logging in with ${email} and ${password}`);
  }

  loginWithGoogle() {
    console.log('Logging in with google');
  }

  loginWithGithub() {
    console.log('Logging in with github');
  }

  forgotPassword() {
    console.log('Handling forgot password users');
  }
}
