import {
  Component,
  Input,
  WritableSignal,
  signal,
  EventEmitter,
  Output,
  computed,
  Signal,
  inject,
  OnInit,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Status, UserApplication } from '../../application-utils/application';
import { AppliCardComponent } from '../appli-card/appli-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { Subscription, timer } from 'rxjs';
import { ApplicationService } from '../../application-service/application.service';

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
  applicationSerivce: ApplicationService = inject(ApplicationService);

  @Input({ required: true }) status!: Status;

  @Output() dragEventEmitter = new EventEmitter<
    [UserApplication, number, Status]
  >();

  timerSubscription: Subscription | undefined;
  header!: string;
  filterBy: WritableSignal<string> = signal('');

  filteredApplications: Signal<UserApplication[]> = computed(() => {
    let filter = this.filterBy().toLowerCase();
    return this.applicationSerivce
      .applications()
      [this.status].filter(
        (application) =>
          application.jobDetail.company.toLowerCase().includes(filter) ||
          application.jobDetail.title.toLowerCase().includes(filter)
      );
  });

  ngOnInit() {
    this.header = this.status.charAt(0).toUpperCase() + this.status.slice(1);
  }

  trackByFn(index: number, application: UserApplication) {
    return application._id;
  }

  filterApplication(event: any) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(400).subscribe(() => {
      this.filterBy.set(event);
    });
  }

  dragStart(userApplication: UserApplication) {
    let index = this.applicationSerivce
      .applications()
      [this.status].findIndex((application) => {
        return application._id == userApplication._id;
      });

    this.dragEventEmitter.emit([userApplication, index, this.status]);
  }
}