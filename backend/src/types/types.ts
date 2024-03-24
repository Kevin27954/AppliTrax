import { ObjectId } from "mongodb";

export type Status = "applied" | "rejected" | "interview" | "offer";

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
}
