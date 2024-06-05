import { Component, inject } from '@angular/core';
import { TrendingService } from './trending-service/trending.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent {
  trendingService = inject(TrendingService);

  data = this.trendingService.trends;

  constructor() {
    this.trendingService.getTrending();
  }
}
