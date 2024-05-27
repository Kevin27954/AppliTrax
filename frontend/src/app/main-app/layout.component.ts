import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout-ui-components/sidebar/sidebar.component';
import { PageHeaderComponent } from './layout-ui-components/page-header/page-header.component';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SidebarComponent, PageHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  pageChangeHandler: MenuItem = { label: 'Overview' };

  constructor() {
    effect(() => {
      if (!this.authService.isAuth()) {
        this.router.navigate(['auth/login']);
      }
    });
  }

  onPageChangeEmit(page: string) {
    this.pageChangeHandler = { label: page };
  }

  logOut() {
    this.authService.logout();
  }
}
