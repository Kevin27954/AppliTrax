import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faArrowTrendUp = faArrowTrendUp;
  activeLink = 'active-link';

  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (!this.authService.isAuth()) {
        this.router.navigate(['auth/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
