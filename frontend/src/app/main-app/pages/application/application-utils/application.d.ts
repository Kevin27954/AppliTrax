export type Status =
  | 'applied'
  | 'rejected'
  | 'interview'
  | 'offered'
  | 'archived'
  | 'withdrawn'
  | 'accepted'
  | 'declined';

export interface ApplicationHistory {
  applied: UserApplication[];
  rejected: UserApplication[];
  interview: UserApplication[];
  offered: UserApplication[];
  archived: UserApplication[];
  withdrawn: UserApplication[];
  accepted: UserApplication[];
  declined: UserApplication[];
}

export interface UserApplication {
  _id: string;
  uid: string;
  jobDetail: JobDetail;
  status: Status;
  notes: string;
  appliedOn: Date;
  createdOn: Date;
  updatedOn: Date;
}

export interface JobDetail {
  _id: string;
  title: string;
  location: string;
  company: string;
  jobtype: string;
}

export interface NewApplication {
  title: string;
  location: string;
  company: string;
  appliedOn: Date;
  jobType: string;
}