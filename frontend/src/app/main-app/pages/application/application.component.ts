import { Component, inject } from '@angular/core';
import { ApplicationService } from './application-service/application.service';
import { UserApplication, Status, NewApplication } from './application-utils/application';
import { CommonModule } from '@angular/common';
import { AppliCardComponent } from './application-ui-components/appli-card/appli-card.component';
import { AppliBoardComponent } from './application-ui-components/appli-board/appli-board.component';
import { DragDropModule } from 'primeng/dragdrop';
import { AppliInfoBoxComponent } from './application-ui-components/appli-info-box/appli-info-box.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-application',
  standalone: true,
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
  imports: [
    CommonModule,
    AppliCardComponent,
    AppliBoardComponent,
    AppliInfoBoxComponent,
    DragDropModule,
    CommonModule,
    ButtonModule
  ],
})
export class ApplicationComponent {
  applicationSerivce: ApplicationService = inject(ApplicationService);

  draggedApplicationData: [UserApplication, number, Status] | undefined | null;

  isDragEnter: boolean = false;

  statues: Status[] = [
    'applied',
    'interview',
    'rejected',
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
    if (
      this.draggedApplicationData &&
      destination != this.draggedApplicationData[2]
    ) {
      this.applicationSerivce.updateDragDrop(
        this.draggedApplicationData,
        destination
      );
    }
    this.draggedApplicationData = null;
  }

  onDragEmit(applicationData: [UserApplication, number, Status]) {
    this.draggedApplicationData = applicationData;
  }

  onFormDataEmit(applicationData: [UserApplication, number, Status]) {
    this.applicationSerivce.updateApplication(applicationData);
  }

  onNewApplicationEmit(data: NewApplication) {
    this.applicationSerivce.addApplication(data);
  }

}
