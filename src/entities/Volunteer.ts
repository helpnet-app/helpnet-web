import { User } from "./User";

export interface Volunteer extends User{
  username: string;
  password: string;
  name: string;
  birthday: string;
  cep: string;
  city: string;
  confirmPassword: string;
  country: string;
  cpf: string;
  district: string;
  email: string;
  houseNumber: string;
  phone: string;
  rg: string;
  state: string;
  whatsapp: string;
}