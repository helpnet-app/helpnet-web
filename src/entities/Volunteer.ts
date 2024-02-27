
<<<<<<< Updated upstream
export interface Volunteer {
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
=======
export interface Volunteer extends User {
  birthDate: Date;
  CPF: string;
  RG: string;
}
>>>>>>> Stashed changes
