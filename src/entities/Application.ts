import { Program } from "./Program";
import { Volunteer } from "./Volunteer";
import { ApplicationStatusEnum } from "./enum/application_status_enum";

interface Schedule {
  days: string[];
  period: string[];
}

export interface Questions {
  schedule: Schedule;
  personalDescription: string;
  experience: string;
}

export interface Application {
  appliedAt: Date;
  finishedAt: Date;
  questions: Questions;
  volunteer?: Volunteer;
  program?: Program;
  status: ApplicationStatusEnum;
}

export interface VolunteerApplication {
  application: Application;
  volunteers: Volunteer[];
}
