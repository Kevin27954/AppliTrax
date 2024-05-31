import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-job-board-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './job-board-toolbar.component.html',
  styleUrl: './job-board-toolbar.component.css',
})
export class JobBoardToolbarComponent {
  formGroup = new FormGroup({
    url: new FormControl(''),
  });

  @Output() addNewUrlEmitter = new EventEmitter();

  addNewUrl() {
    this.addNewUrlEmitter.emit(this.formGroup.value.url!);
  }
}
