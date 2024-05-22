import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ApplicationService } from '../../application-service/application.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appli-info-box',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appli-info-box.component.html',
  styleUrl: './appli-info-box.component.css',
})
export class AppliInfoBoxComponent {
  applicationService = inject(ApplicationService);

  total = this.applicationService.getTotalApplications();
  visible: boolean = false;

  @Output() newApplicationEmitter = new EventEmitter();

  jobTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote',
  ];

  formGroup = new FormGroup({
    title: new FormControl(''),
    location: new FormControl(''),
    company: new FormControl(''),
    appliedOn: new FormControl(''),
    jobType: new FormControl(''),
  });

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    this.newApplicationEmitter.emit(this.formGroup.value);
  }
}
