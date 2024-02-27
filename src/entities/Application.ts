import { Volunteer } from './Volunteer';
import { ApplicationStatusEnum } from './enum/application_status_enum';

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
  status: ApplicationStatusEnum;
  volunteer: string;
  program: string;
  appliedAt: Date;
  finishedAt: Date;
  questions: Questions; 
}

export interface VolunteerApplication {
  application: Application,
  volunteers: Volunteer[],
}
