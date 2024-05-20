import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api/api.service';
import { ApplicationService } from '../application/application-service/application.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {

  api = inject(ApiService)
  appliatoin = inject(ApplicationService)

  constructor() {
    console.log(this.appliatoin.applications());
  }
}
