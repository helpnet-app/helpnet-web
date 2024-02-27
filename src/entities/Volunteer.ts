import { User } from "./User";

export interface Volunteer extends User {
  birthDate: Date;
  CPF: string;
  RG: string;
}
