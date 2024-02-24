import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {

  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (!this.authService.isAuth()) {
        console.log("I ran?");
        this.router.navigate(['auth/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
