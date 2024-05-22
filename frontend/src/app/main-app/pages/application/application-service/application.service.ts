import { Injectable, Signal, WritableSignal, inject, signal, OnInit } from '@angular/core';
import {
  UserApplication,
  ApplicationHistory,
  Status,
  NewApplication,
} from '../application-utils/application';
import { ApiService } from '../../../../api/api.service';


@Injectable({
  providedIn: 'any',
})
export class ApplicationService {
  apiService = inject(ApiService);

  total = signal(0);

  constructor() {
    this.getApplications();
  }

  applications: WritableSignal<ApplicationHistory> = signal({
    applied: [],
    rejected: [],
    interview: [],
    offered: [],
    archived: [],
    withdrawn: [],
    accepted: [],
    declined: [],
  });

  getTotalApplications() {
    return this.total;
  }

  getApplications() {
    this.apiService.getApplications().subscribe((result) => {
      this.applications.update((applications) => {
        let copy = {...applications}

        this.total.set(result.applications.length);

        for (let i = 0; i < result.applications.length; i++) {
          copy[result.applications[i].status].push(result.applications[i])
        }

        return copy;
      })

    })
  }

  addApplication(data: NewApplication) {
    this.apiService.addAppliation(data).subscribe();
  }

  updateApplication(applicationData: [UserApplication, number, Status]) {

    this.apiService.editApplication(applicationData[0]).subscribe((data) => {
      console.log(data);
    })

    this.applications.update((currentApplications) => {
      let updatedApplications = { ...currentApplications };

      if (applicationData[2] === applicationData[0].status) {
        updatedApplications[applicationData[2]][applicationData[1]] =
          applicationData[0];
      } else {
        updatedApplications[applicationData[2]].splice(applicationData[1], 1);
        updatedApplications[applicationData[0].status].push(applicationData[0]);
      }

      return updatedApplications;
    });
  }

  updateDragDrop(
    draggedApplicationData:
      | [UserApplication, number, Status]
      | null
      | undefined,
    destination: Status
  ) {
    this.applications.update((currentApplications) => {
      let updatedApplications = { ...currentApplications };

      updatedApplications[draggedApplicationData![2]].splice(
        draggedApplicationData![1],
        1
      );

      let draggedApplication = draggedApplicationData![0];
      draggedApplication.status = destination;

      updatedApplications[destination].push(draggedApplication);

      return updatedApplications;
    });
  }
}
