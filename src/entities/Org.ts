import { User } from "./User";

export interface Org extends User{
   tradeName: string;
   CNPJ: string;
  }