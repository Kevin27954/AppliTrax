import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
  OnInit,
} from '@angular/core';
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
      let copy: ApplicationHistory = {
        applied: [],
        rejected: [],
        interview: [],
        offered: [],
        archived: [],
        withdrawn: [],
        accepted: [],
        declined: [],
      };

      this.total.set(result.applications.length);

      for (let i = 0; i < result.applications.length; i++) {
        copy[result.applications[i].status as Status].push(
          result.applications[i],
        );
      }
      this.applications.set(copy);
    });
  }

  addApplication(data: NewApplication) {
    this.apiService.addAppliation(data).subscribe((res: any) => {
      this.applications.update((currentApplications) => {
        let updatedApplications = { ...currentApplications };
        updatedApplications.applied.push(res.application as UserApplication);

        this.total.update((curr) => {
          return curr + 1;
        });

        return updatedApplications;
      });
    });
  }

  updateApplication(applicationData: [UserApplication, number, Status]) {
    this.apiService.editApplication(applicationData[0]).subscribe((data) => {
      console.log(data);
    });

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
    draggedApplicationData: [UserApplication, number, Status],
    destination: Status,
  ) {
    draggedApplicationData[0].status = destination;

    this.apiService
      .editApplication(draggedApplicationData[0])
      .subscribe((data) => {
        console.log(data);
      });

    this.applications.update((currentApplications) => {
      let updatedApplications = { ...currentApplications };

      updatedApplications[draggedApplicationData![2]].splice(
        draggedApplicationData![1],
        1,
      );

      updatedApplications[destination].push(draggedApplicationData[0]);

      return updatedApplications;
    });
  }
}
