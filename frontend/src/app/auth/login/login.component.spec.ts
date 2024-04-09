import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentElements: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    componentElements = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have login page header', () => {
    expect(componentElements.querySelector('h1')?.textContent).toContain(
      'Ready to Job Hunt?'
    );
  });

  it('should have email and password field', () => {
    expect(
      componentElements.querySelector(
        '.div-login-inputs-wrapper>[formcontrolname="password"]'
      )
    ).toBeTruthy();
    expect(
      componentElements.querySelector('[data-testid="input-email"]')
    ).toBeTruthy();
  });

  it('should have email and password connected to form control', () => {
    let testEmail = 'test@gmail.com';
    let testPassword = 'password123';

    let inputPassword: HTMLInputElement = componentElements.querySelector(
      '[data-testid="input-password"]>.p-password>input'
    )!;

    let inputEmail: HTMLInputElement = componentElements.querySelector(
      '[data-testid="input-email"]'
    )!;
    inputEmail.value = testEmail;
    inputEmail.dispatchEvent(new Event('input'));
    inputPassword.value = testPassword;
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEmail.value).toContain(component.formGroup.value.email!);
    expect(inputPassword.value).toContain(component.formGroup.value.password!);
  });


});
