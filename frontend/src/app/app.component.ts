import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AppliTrax';

  routes: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.routes = [
      '/',
      'auth/login',
      'auth/register',
      'overview',
      'application',
      'jobboards',
      'trending',
    ];
  }
}
