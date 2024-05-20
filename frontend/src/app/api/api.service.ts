import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserApplication } from '../main-app/pages/application/application-utils/application';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

type ApplicationResponse = {
  application: UserApplication;
};

type ApplicationsResponse = {
  applications: UserApplication[];
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);

  constructor() {}

  getApplications() {
    return this.httpClient.get<ApplicationsResponse>(
      `${environment.devServer}/jobs/all`
    );
  }

  editApplication(application: UserApplication) {
    let fields = {
      'jobDetail.title': application.jobDetail.title,
      'jobDetail.location': application.jobDetail.location,
      'jobDetail.jobtype': application.jobDetail.jobtype,
      status: application.status,
      notes: application.notes,
      appliedOn: application.appliedOn
    };

    return this.httpClient.put(
      `${environment.devServer}/jobs/edit/${application._id}`,
      { fields: fields }
    );
  }
}
