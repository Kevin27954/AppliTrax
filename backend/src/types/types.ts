import { ObjectId } from "mongodb";

export type Status =
    | "applied"
    | "rejected"
    | "interview"
    | "offered"
    | "archived"
    | "withdrawn"
    | "accepted"
    | "declined";

export interface JobApplicationData {
    job_title: string;
    status: Status;
    company: string;
    appliedOn: Date;
    notes: string /** Max 200-300 characters */;
    createdOn: Date;
    updatedOn: Date;
}

export interface UserData {
    _id: ObjectId;
    uid: string;
    username: string;
    email: string | undefined;
    major: string;
    createdOn: Date;
    updatedOn: Date;
    lastLogin: Date;
}

export interface JobDetail {
    _id: ObjectId;
    title: string;
    location: string;
    company: string;
    jobtype: string;
}

export interface UserApplication {
    _id: ObjectId;
    uid: string;
    jobDetail: JobDetail;
    status: Status;
    notes: string;
    appliedOn: Date;
    createdOn: Date;
    updatedOn: Date;
}
