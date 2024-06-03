import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api/api.service';
import { ChartModule } from 'primeng/chart';
import { lineOptions, pieOptions } from './overview-utils/utils';
import { ApplicationService } from '../application/application-service/application.service';
import { UserApplication } from '../application/application-utils/application';
import { AppliCardComponent } from '../application/application-ui-components/appli-card/appli-card.component';
import { AppliCardModalComponent } from '../application/application-ui-components/appli-card-modal/appli-card-modal.component';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    AppliCardComponent,
    AppliCardModalComponent,
    SidebarModule,
  ],
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

  oldestApplications: any;

  modalState = false;
  modalApplication: WritableSignal<UserApplication | null> = signal(null);
  applicationIndex: number = 0;

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
        labels: ['Applied', 'Rejected', 'Interview', 'Offered'],
        datasets: [
          {
            data: data,
          },
        ],
      };
    });

    this.api.getOldestApplications().subscribe((value: any) => {
      this.oldestApplications = value.applications;
      console.log(value.applications);
    });
  }

  trackByFn(index: number, application: UserApplication) {
    return application._id;
  }

  openModal(application: UserApplication, index: number) {
    this.modalState = true;
    this.modalApplication.set(application);
    this.applicationIndex = index;
  }

  oncloseModalEmit() {
    this.modalState = false;
  }

  onFormDataEmit(modifiedApplication: UserApplication) {
    this.api.editApplication(modifiedApplication).subscribe();

    this.oldestApplications[this.applicationIndex] = modifiedApplication;
  }

  getNumPerCategory(array: any) {
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
