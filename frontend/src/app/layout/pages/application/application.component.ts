import { Component, inject } from '@angular/core';
import { ApplicationService } from './application-service/application.service';
import {
  UserApplication,
  Status,
} from './application-utils/application';
import { CommonModule } from '@angular/common';
import { AppliCardComponent } from './application-ui-components/appli-card/appli-card.component';
import { AppliBoardComponent } from './application-ui-components/appli-board/appli-board.component';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-application',
  standalone: true,
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
  imports: [
    CommonModule,
    AppliCardComponent,
    AppliBoardComponent,
    DragDropModule,
  ],
})
export class ApplicationComponent {
  applicationSerivce: ApplicationService = inject(ApplicationService);

  draggedUserApplication: [UserApplication, number, Status] | undefined | null;

  statues: Status[] = [
    'applied',
    'rejected',
    'interview',
    'offered',
    'accepted',
    'declined',
    'withdrawn',
    'archived',
  ];

  logApplications() {
    console.log(this.applicationSerivce.applications());
  }

  trackByFn(index: number, status: Status) {
    return index;
  }

  drop(destination: Status) {
    let updatedApplications = { ...this.applicationSerivce.applications() };

    if (
      this.draggedUserApplication &&
      destination != this.draggedUserApplication[2]
    ) {
      updatedApplications[this.draggedUserApplication[2]].splice(
        this.draggedUserApplication[1],
        1
      );
      updatedApplications[destination].push(this.draggedUserApplication[0]);
    }

    this.applicationSerivce.applications.set(updatedApplications);

    this.draggedUserApplication = null;
  }

  handleDragEmit(applicationData: [UserApplication, number, Status]) {
    this.draggedUserApplication = applicationData;
  }
}
