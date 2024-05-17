import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import {
  UserApplication,
  ApplicationHistory,
  Status,
} from '../application-utils/application';

@Injectable({
  providedIn: 'any',
})
export class ApplicationService {
  constructor() {
    this.getApplications();
  }

  applications: WritableSignal<ApplicationHistory> = signal({
    applied: [],
    rejected: [],
    interview: [],
    offered: [],
    archived: [],
    withdrawn: [],
    accepted: [],
    declined: [],
  });

  getApplications() {
    // HTTP get request
    console.log('I ran');
    let temp = this.applications();
    for (const application of APPLICATIONS_MOCK_DATA) {
      temp[application.status as Status].push(application);
    }

    this.applications.set(temp);
  }

  updateApplication(applicationData: [UserApplication, number, Status]) {
    this.applications.update((currentApplications) => {
      let updatedApplications = { ...currentApplications };

      if (applicationData[2] === applicationData[0].status) {
        updatedApplications[applicationData[2]][applicationData[1]] =
          applicationData[0];
      } else {
        updatedApplications[applicationData[2]].splice(applicationData[1], 1);
        updatedApplications[applicationData[0].status].push(applicationData[0]);
      }

      return updatedApplications;
    });
  }

  updateDragDrop(
    draggedApplicationData:
      | [UserApplication, number, Status]
      | null
      | undefined,
    destination: Status
  ) {
    this.applications.update((currentApplications) => {
      let updatedApplications = { ...currentApplications };

      updatedApplications[draggedApplicationData![2]].splice(
        draggedApplicationData![1],
        1
      );

      let draggedApplication = draggedApplicationData![0];
      draggedApplication.status = destination;

      updatedApplications[destination].push(draggedApplication);

      return updatedApplications;
    });
  }
}

const APPLICATIONS_MOCK_DATA: UserApplication[] = [
  {
    _id: '6605f3046a371e98ff2b75ec',
    uid: 'phoenixCosmos123',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75ed',
      title: 'Data Scientist',
      location: 'San Francisco',
      company: 'Google',
      jobtype: 'Full-time',
    },
    status: 'interview',
    notes: 'Candidate has strong machine learning skills.',
    appliedOn: new Date(1711665934969),
    createdOn: new Date(1711665934969),
    updatedOn: new Date(1711665934969),
  },
  {
    _id: '6605f3046a371e98ff2b75ee',
    uid: 'johnDoe456',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75ef',
      title: 'Product Manager',
      location: 'New York',
      company: 'Microsoft',
      jobtype: 'Full-time',
    },
    status: 'rejected',
    notes: 'Position filled internally.',
    appliedOn: new Date(1711665944969),
    createdOn: new Date(1711665944969),
    updatedOn: new Date(1711665944969),
  },
  {
    _id: '6605f3046a371e98ff2b75f0',
    uid: 'emmaSmith789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75f1',
      title: 'UX Designer',
      location: 'Los Angeles',
      company: 'Apple',
      jobtype: 'Contract',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711665954969),
    createdOn: new Date(1711665954969),
    updatedOn: new Date(1711665954969),
  },
  {
    _id: '6605f3046a371e98ff2b75f2',
    uid: 'saraJohnson012',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75f3',
      title: 'Software Engineer',
      location: 'Seattle',
      company: 'Amazon',
      jobtype: 'Remote',
    },
    status: 'offered',
    notes: 'Awaiting candidate response.',
    appliedOn: new Date(1711665964969),
    createdOn: new Date(1711665964969),
    updatedOn: new Date(1711665964969),
  },
  {
    _id: '6605f3046a371e98ff2b75f4',
    uid: 'michaelBrown321',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75f5',
      title: 'Data Analyst',
      location: 'Chicago',
      company: 'Facebook',
      jobtype: 'Internship',
    },
    status: 'offered',
    notes: 'Starting next Monday.',
    appliedOn: new Date(1711665974969),
    createdOn: new Date(1711665974969),
    updatedOn: new Date(1711665974969),
  },
  {
    _id: '6605f3046a371e98ff2b75f6',
    uid: 'janeDoe789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75f7',
      title: 'Marketing Manager',
      location: 'London',
      company: 'Uber',
      jobtype: 'Full-time',
    },
    status: 'offered',
    notes: '',
    appliedOn: new Date(1711665984969),
    createdOn: new Date(1711665984969),
    updatedOn: new Date(1711665984969),
  },
  {
    _id: '6605f3046a371e98ff2b75f8',
    uid: 'alexJohnson456',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75f9',
      title: 'Financial Analyst',
      location: 'Boston',
      company: 'Netflix',
      jobtype: 'Part-time',
    },
    status: 'accepted',
    notes: '',
    appliedOn: new Date(1711665994969),
    createdOn: new Date(1711665994969),
    updatedOn: new Date(1711665994969),
  },
  {
    _id: '6605f3046a371e98ff2b75fa',
    uid: 'amandaSmith012',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75fb',
      title: 'Graphic Designer',
      location: 'Paris',
      company: 'Airbnb',
      jobtype: 'Contract',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711666004969),
    createdOn: new Date(1711666004969),
    updatedOn: new Date(1711666004969),
  },
  {
    _id: '6605f3046a371e98ff2b75fc',
    uid: 'davidMiller789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75fd',
      title: 'Software Developer',
      location: 'Berlin',
      company: 'Adobe',
      jobtype: 'Full-time',
    },
    status: 'interview',
    notes: 'Phone interview set for Friday.',
    appliedOn: new Date(1711666014969),
    createdOn: new Date(1711666014969),
    updatedOn: new Date(1711666014969),
  },
  {
    _id: '6605f3046a371e98ff2b75fe',
    uid: 'emilyClark321',
    jobDetail: {
      _id: '6605f3046a371e98ff2b75ff',
      title: 'Data Engineer',
      location: 'Tokyo',
      company: 'IBM',
      jobtype: 'Full-time',
    },
    status: 'declined',
    notes: 'Candidate accepted another offer.',
    appliedOn: new Date(1711666024969),
    createdOn: new Date(1711666024969),
    updatedOn: new Date(1711666024969),
  },
  {
    _id: '6605f3046a371e98ff2b7600',
    uid: 'sophiaJohnson123',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7601',
      title: 'Web Developer',
      location: 'Austin',
      company: 'Twitter',
      jobtype: 'Full-time',
    },
    status: 'accepted',
    notes: 'Starting next month.',
    appliedOn: new Date(1711666034969),
    createdOn: new Date(1711666034969),
    updatedOn: new Date(1711666034969),
  },
  {
    _id: '6605f3046a371e98ff2b7602',
    uid: 'liamWilson456',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7603',
      title: 'Network Engineer',
      location: 'Toronto',
      company: 'Cisco',
      jobtype: 'Contract',
    },
    status: 'interview',
    notes: 'Technical interview scheduled for next week.',
    appliedOn: new Date(1711666044969),
    createdOn: new Date(1711666044969),
    updatedOn: new Date(1711666044969),
  },
  {
    _id: '6605f3046a371e98ff2b7604',
    uid: 'oliviaMartinez789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7605',
      title: 'Systems Analyst',
      location: 'Sydney',
      company: 'Oracle',
      jobtype: 'Full-time',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711666054969),
    createdOn: new Date(1711666054969),
    updatedOn: new Date(1711666054969),
  },
  {
    _id: '6605f3046a371e98ff2b7606',
    uid: 'williamBrown012',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7607',
      title: 'UI/UX Designer',
      location: 'Vancouver',
      company: 'Salesforce',
      jobtype: 'Remote',
    },
    status: 'offered',
    notes: 'Waiting for candidate feedback.',
    appliedOn: new Date(1711666064969),
    createdOn: new Date(1711666064969),
    updatedOn: new Date(1711666064969),
  },
  {
    _id: '6605f3046a371e98ff2b7608',
    uid: 'miaAnderson456',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7609',
      title: 'DevOps Engineer',
      location: 'Dublin',
      company: 'VMware',
      jobtype: 'Full-time',
    },
    status: 'interview',
    notes: 'Technical round scheduled for Friday.',
    appliedOn: new Date(1711666074969),
    createdOn: new Date(1711666074969),
    updatedOn: new Date(1711666074969),
  },
  {
    _id: '6605f3046a371e98ff2b760a',
    uid: 'ethanThomas789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b760b',
      title: 'Project Manager',
      location: 'Munich',
      company: 'Siemens',
      jobtype: 'Contract',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711666084969),
    createdOn: new Date(1711666084969),
    updatedOn: new Date(1711666084969),
  },
  {
    _id: '6605f3046a371e98ff2b760c',
    uid: 'avaWilson012',
    jobDetail: {
      _id: '6605f3046a371e98ff2b760d',
      title: 'Software Architect',
      location: 'Barcelona',
      company: 'Intel',
      jobtype: 'Full-time',
    },
    status: 'declined',
    notes: 'Candidate pursuing other opportunities.',
    appliedOn: new Date(1711666094969),
    createdOn: new Date(1711666094969),
    updatedOn: new Date(1711666094969),
  },
  {
    _id: '6605f3046a371e98ff2b760e',
    uid: 'loganGarcia789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b760f',
      title: 'Data Scientist',
      location: 'Austin',
      company: 'Tesla',
      jobtype: 'Internship',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711666104969),
    createdOn: new Date(1711666104969),
    updatedOn: new Date(1711666104969),
  },
  {
    _id: '6605f3046a371e98ff2b7610',
    uid: 'harperLee012',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7611',
      title: 'Frontend Developer',
      location: 'Montreal',
      company: 'Shopify',
      jobtype: 'Full-time',
    },
    status: 'interview',
    notes: 'Technical interview set for Thursday.',
    appliedOn: new Date(1711666114969),
    createdOn: new Date(1711666114969),
    updatedOn: new Date(1711666114969),
  },
  {
    _id: '6605f3046a371e98ff2b7612',
    uid: 'lucasTaylor789',
    jobDetail: {
      _id: '6605f3046a371e98ff2b7613',
      title: 'Database Administrator',
      location: 'Stockholm',
      company: 'SAP',
      jobtype: 'Contract',
    },
    status: 'applied',
    notes: '',
    appliedOn: new Date(1711666124969),
    createdOn: new Date(1711666124969),
    updatedOn: new Date(1711666124969),
  },
];
