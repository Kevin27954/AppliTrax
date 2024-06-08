import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { environment } from '../../../environments/environment.development';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentElements: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
          const auth = getAuth();
          if (!environment.prod) {
            connectAuthEmulator(auth, 'http://localhost:9099', {
              disableWarnings: true,
            });
          }
          return auth;
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    componentElements = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
