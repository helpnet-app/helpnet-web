import { Program } from "./Program";
import { Volunteer } from "./Volunteer";

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
}
