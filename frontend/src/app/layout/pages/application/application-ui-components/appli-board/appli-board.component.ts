import {
  Component,
  Input,
  WritableSignal,
  signal,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Status, UserApplication } from '../../application-utils/application';
import { AppliCardComponent } from '../appli-card/appli-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-appli-board',
  standalone: true,
  imports: [
    CardModule,
    AppliCardComponent,
    CommonModule,
    InputTextModule,
    FormsModule,
    DragDropModule,
  ],
  templateUrl: './appli-board.component.html',
  styleUrl: './appli-board.component.css',
})
export class AppliBoardComponent {
  @Input({ required: true }) header!: string;
  @Input({ required: true }) applicationHistory!: UserApplication[];

  temp: string = "sdfsa"

  filteredApplications!: WritableSignal<UserApplication[]>;

  filterBy: string | undefined;
  timerSubscription: Subscription | undefined;

  @Output() dragEventEmitter = new EventEmitter<[UserApplication, number, Status]>();

  ngOnInit() {
    this.temp.toUpperCase
    this.filteredApplications = signal(this.applicationHistory);
  }

  trackByFn(index: number, application: UserApplication) {
    return application._id;
  }

  getFilteredResult() {
    return this.applicationHistory.filter((application) => {
      return (
        application.jobDetail.company
          .toLowerCase()
          .includes(this.filterBy!.toLowerCase()) ||
        application.jobDetail.title
          .toLowerCase()
          .includes(this.filterBy!.toLowerCase())
      );
    });
  }

  filterApplication(event: any) {
    this.filterBy = event;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(500).subscribe(() =>
      this.filteredApplications.set(this.getFilteredResult())
    );
  }

  dragStart(userApplication: UserApplication, index: number) {
    this.dragEventEmitter.emit([userApplication, index, (this.header.toLowerCase() as Status)]);
  }
}
