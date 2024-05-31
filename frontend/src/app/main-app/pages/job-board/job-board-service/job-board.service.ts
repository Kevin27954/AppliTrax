import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { JobUrl } from '../job-board-utils/job-board';

@Injectable({
  providedIn: 'root',
})
export class JobBoardService {
  apiService = inject(ApiService);

  jobBoards: WritableSignal<JobUrl[]> = signal([]);

  constructor() {
    this.getJobBoards();
  }

  getJobBoards() {
    this.apiService.getJobBoards().subscribe((jobBoards) => {
      this.jobBoards.set(jobBoards.jobBoards);
    });
  }

  addJobBoard(url: string) {
    this.apiService.addNewJobBoards(url).subscribe((newUrlRes: any) => {
      this.jobBoards.update((currData) => {
        currData.push(newUrlRes.new_url);
        return currData;
      });
    });
  }

  editJobBoard(_id: string, new_url: string, index: number) {
    this.apiService.editJobBoard(_id, new_url).subscribe();
    this.jobBoards.update((jobBoardsArr) => {
      jobBoardsArr[index].url = new_url;
      return jobBoardsArr;
    });
  }

  removeJobBoard(index: number) {
    this.apiService.removeJobBoard(this.jobBoards()[index]._id).subscribe();
    this.jobBoards.update((jobBoardsArr) => {
      jobBoardsArr.splice(index, 1);
      return jobBoardsArr;
    });
  }
}
