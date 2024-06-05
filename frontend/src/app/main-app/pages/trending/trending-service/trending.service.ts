import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from '../../../../api/api.service';

interface trendingResponse {
  _id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  apiService = inject(ApiService);

  trends: WritableSignal<trendingResponse[]> = signal([]);

  constructor() {}

  getTrending() {
    this.apiService.getTrendingCompanies().subscribe((trendsResponse) => {
      this.trends.set(trendsResponse);
    });
  }
}
