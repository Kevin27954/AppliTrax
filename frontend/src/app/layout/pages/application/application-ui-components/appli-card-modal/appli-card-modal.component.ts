import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  JobDetail,
  Status,
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
  ],
  templateUrl: './appli-card-modal.component.html',
  styleUrl: './appli-card-modal.component.css',
})
export class AppliCardModalComponent {
  formGroup!: FormGroup;
  applicationData!: UserApplication | null;

  @Input({ required: true }) set setFormData(
    application: UserApplication | null
  ) {
    let status = '';
    if (application != null) {
      status =
        application.status.charAt(0).toUpperCase() +
          application.status.substring(1).toLowerCase() || '';
    }

    this.formGroup = new FormGroup({
      title: new FormControl(application?.jobDetail.title || ''),
      appliedOn: new FormControl(application?.appliedOn || ''),
      company: new FormControl(application?.jobDetail.company || ''),
      location: new FormControl(application?.jobDetail.location || ''),
      status: new FormControl(status),
      jobType: new FormControl(application?.jobDetail.jobtype || ''),
      notes: new FormControl(application?.notes || ''),
    });
    this.applicationData = application;
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

    let copyJobDetail: JobDetail = {
      ...this.applicationData!.jobDetail,
      title: this.formGroup.value.title,
      location: this.formGroup.value.location,
      company: this.formGroup.value.company,
      jobtype: this.formGroup.value.jobType,
    };

    this.formDataEmitter.emit({
      ...this.applicationData!,
      jobDetail: copyJobDetail,
      status: this.formGroup.value.status.toLowerCase(),
      notes: this.formGroup.value.notes,
      appliedOn: this.formGroup.value.appliedOn,
    });
  }
}
