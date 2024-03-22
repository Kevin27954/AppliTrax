export type Status = "applied" | "rejected" | "interview" | "offer";

export interface JobApplication {
    job_title: string;
    status: Status;
    company: string;
    appliedOn: Date;
    updatedOn: Date;
    notes: string /** Max 200-300 characters */;
}

