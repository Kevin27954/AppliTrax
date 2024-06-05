import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserApplication } from '../main-app/pages/application/application-utils/application';
import { JobUrl } from '../main-app/pages/job-board/job-board-utils/job-board';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

type ApplicationsResponse = {
  applications: UserApplication[];
};

interface jobBoardHttpRes {
  jobBoards: JobUrl[];
}

interface trendingResponse {
  _id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);

  constructor() {}

  // APPLICATION API ENDPOINTS
  getApplications() {
    return this.httpClient.get<ApplicationsResponse>(
      `${environment.server}/jobs/all`,
    );
  }

  editApplication(application: UserApplication) {
    let fields = {
      'jobDetail.title': application.jobDetail.title,
      'jobDetail.location': application.jobDetail.location,
      'jobDetail.jobtype': application.jobDetail.jobtype,
      status: application.status,
      notes: application.notes,
      appliedOn: application.appliedOn,
    };

    return this.httpClient.put(
      `${environment.server}/jobs/edit/${application._id}`,
      { fields: fields },
    );
  }

  addAppliation(data: any) {
    let bodyData = {
      title: data.title,
      location: data.location,
      company: data.company,
      appliedOn: data.appliedOn,
      jobType: data.jobType,
    };

    return this.httpClient.post(`${environment.server}/jobs/new`, bodyData);
  }

  // JOB BOARD API ENDPOINTS

  getJobBoards() {
    return this.httpClient.get<jobBoardHttpRes>(
      `${environment.server}/jobboard/get`,
    );
  }

  addNewJobBoards(url: string) {
    let body = {
      jobboard: {
        url: url,
      },
    };

    return this.httpClient.post(`${environment.server}/jobboard/new`, body);
  }

  editJobBoard(_id: string, new_url: string) {
    let body = {
      jobboard: {
        _id: _id,
        url: new_url,
      },
    };

    return this.httpClient.put(`${environment.server}/jobboard/update`, body);
  }

  removeJobBoard(_id: string) {
    let body = {
      jobboard: {
        _id: _id,
      },
    };

    let deleteHttpOptions = { ...httpOptions, body: body };

    return this.httpClient.delete(
      `${environment.server}/jobboard/remove`,
      deleteHttpOptions,
    );
  }

  //OVERVIEW API ENDPOINTS

  getApplicationStatsWeek() {
    return this.httpClient.get(`${environment.server}/jobs/status/week`);
  }

  getOldestApplications() {
    return this.httpClient.get(`${environment.server}/jobs/oldest/4`);
  }

  // TRENDING API ENDPOINTS

  getTrendingCompanies() {
    return this.httpClient.get<trendingResponse[]>(
      `${environment.server}/jobs/trending`,
    );
  }
}
