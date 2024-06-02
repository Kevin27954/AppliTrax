import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api/api.service';
import { ChartModule } from 'primeng/chart';
import { lineOptions, pieOptions } from './overview-utils/utils';
import { ApplicationService } from '../application/application-service/application.service';
import { Status } from '../application/application-utils/application';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  api = inject(ApiService);
  applicationService = inject(ApplicationService);

  appliCountData = this.getNumPerCategory(
    this.applicationService.applications(),
  );

  lineChartData: any;
  pieChartData: any;

  lineOptions = lineOptions;
  pieOptions = pieOptions;

  constructor() {
    this.api.getApplicationStatsWeek().subscribe((value: any) => {
      this.lineChartData = {
        labels: value.data.label,
        datasets: [
          {
            label: 'Applied Applications',
            data: value.data.count,
            borderColor: ['rgba(63, 195, 128)'],
            borderWidth: 1,
            tension: 0.4,
          },
        ],
      };
    });

    this.api.getApplications().subscribe((value: any) => {
      let data = this.getNumPerCategory(value.applications);
      this.pieChartData = {
        labels: [
          'Applied',
          'Rejected',
          'Interview',
          'Offered',
          //'withdrawn',
          //'accepted',
          //'declined',
        ],
        datasets: [
          {
            data: data,
          },
        ],
      };
    });
  }

  logStuff() {
    console.log(this.applicationService.applications());
  }

  getNumPerCategory(array: any) {
    let keys = [
      'applied',
      'rejected',
      'interview',
      'offered',
      //'withdrawn',
      //'accepted',
      //'declined',
    ];
    let data = [0, 0, 0, 0];

    for (let i = 0; i < array.length; i++) {
      switch (array[i].status) {
        case 'applied':
          data[0] += 1;
          break;
        case 'rejected':
          data[1] += 1;
          break;
        case 'interview':
          data[2] += 1;
          break;
        case 'offered':
          data[3] += 1;
          break;
      }
    }

    return data;
  }
}
