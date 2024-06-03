import { Component, inject } from '@angular/core';
import { JobBoardService } from './job-board-service/job-board.service';
import { JobBoardToolbarComponent } from './job-board-ui-component/job-board-toolbar/job-board-toolbar.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [
    JobBoardToolbarComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css',
})
export class JobBoardComponent {
  jobBoardService = inject(JobBoardService);
  visible: boolean = false;
  urlIndex: number = 0;
  editedUrl: string = '';

  constructor() {
    this.jobBoardService.getJobBoards();
  }

  showDialog() {
    this.visible = true;
  }

  setIndex(index: number) {
    console.log(index);
    this.urlIndex = index;
    this.editedUrl = this.jobBoardService.jobBoards()[index].url;
  }

  getJobBoardUrls() {
    return this.jobBoardService.jobBoards();
  }

  onNewUrlEmit(url: string) {
    this.jobBoardService.addJobBoard(url);
  }

  editJobBoard() {
    this.jobBoardService.editJobBoard(
      this.jobBoardService.jobBoards()[this.urlIndex]._id,
      this.editedUrl,
      this.urlIndex,
    );
    this.visible = false;
  }

  removeJobBoard() {
    console.log('removing jobboard');
    this.jobBoardService.removeJobBoard(this.urlIndex);
    this.visible = false;
  }
}
