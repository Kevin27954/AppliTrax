import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  JobDetail,
  UserApplication,
} from '../../application-utils/application';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-appli-card-modal',
  standalone: true,
  imports: [
    InplaceModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './appli-card-modal.component.html',
  styleUrl: './appli-card-modal.component.css',
})
export class AppliCardModalComponent {
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    appliedOn: new FormControl(''),
    company: new FormControl(''),
    location: new FormControl(''),
    jobType: new FormControl(''),
    notes: new FormControl(''),
    status: new FormControl('applied'),
  });
  applicationData!: UserApplication | null;

  @Input({ required: true }) set setFormData(
    application: UserApplication | null,
  ) {
    this.applicationData = application;

    let status = '';
    if (application != null) {
      status =
        application.status.charAt(0).toUpperCase() +
          application.status.substring(1).toLowerCase() || '';
    }

    this.formGroup = new FormGroup({
      title: new FormControl(application?.jobDetail.title || ''),
      appliedOn: new FormControl(new Date(application?.appliedOn || '')),
      company: new FormControl(application?.jobDetail.company || ''),
      location: new FormControl(application?.jobDetail.location || ''),
      jobType: new FormControl(application?.jobDetail.jobtype || ''),
      notes: new FormControl(application?.notes || ''),
      status: new FormControl(status),
    });
  }

  @Output() closeModalEmitter = new EventEmitter<boolean>();
  @Output() formDataEmitter = new EventEmitter<UserApplication>();

  statusOptions = [
    'Applied',
    'Rejected',
    'Interview',
    'Offered',
    'Archived',
    'Withdrawn',
    'Accepted',
    'Declined',
  ];

  jobTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote',
  ];

  submitForm() {
    this.closeModalEmitter.emit();

    let newJobDetail: JobDetail = {
      ...this.applicationData!.jobDetail,
      title: this.formGroup.value.title,
      location: this.formGroup.value.location,
      company: this.formGroup.value.company,
      jobtype: this.formGroup.value.jobType,
    };

    this.formDataEmitter.emit({
      ...this.applicationData!,
      jobDetail: newJobDetail,
      status: this.formGroup.value.status.toLowerCase(),
      notes: this.formGroup.value.notes,
      appliedOn: this.formGroup.value.appliedOn,
    });
  }
}
