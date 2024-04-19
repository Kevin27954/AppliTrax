import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ApplicationService } from './application-service/application.service';
import {
  UserApplication,
  ApplicationHistory,
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

  applications: WritableSignal<ApplicationHistory> = signal(
    this.applicationSerivce.applications
  );

  draggedUserApplication: [UserApplication, number, Status] | undefined | null;

  logApplications() {
    console.log(this.applications());
  }

  trackByFn(index: number, application: UserApplication) {
    return application._id;
  }

  drop(destination: Status) {
    let updatedApplications = this.applications();
    if (this.draggedUserApplication) {
      updatedApplications[this.draggedUserApplication[2]].splice(
        this.draggedUserApplication[1],
        1
      );
      updatedApplications[destination].push(this.draggedUserApplication[0]);
    }

    this.applications.update(() => {
      return updatedApplications;
    });

    this.draggedUserApplication = null;
  }

  handleDragEmit(applicationData: [UserApplication, number, Status]) {
    this.draggedUserApplication = applicationData;
    console.log(applicationData[0], applicationData[1], applicationData[2]);
  }
}
