import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AppliTrax';

  routes: string[] = [];

  constructor(primeNgConfig: PrimeNGConfig) {
    primeNgConfig.ripple = true;
  }

  ngOnInit() {
    this.routes = ['/', 'auth/login', 'auth/register'];
  }
}
