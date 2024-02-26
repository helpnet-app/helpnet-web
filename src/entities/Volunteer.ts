import { User } from "./User";

export interface Volunteer extends User{
  cpf: string;
  rg: string;
  birthday: string;
}