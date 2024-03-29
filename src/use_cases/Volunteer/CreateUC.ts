import { VolunteerToCreateDto } from "../../dtos/volunteer/VolunteerToCreateDto";
import { Volunteer } from "../../entities/Volunteer";
import VolunteerService from "../../services/VolunteerService";

export default class CreateVolunteer {

   private volunteerService: VolunteerService;

   constructor(volunteerService: VolunteerService) {
      this.volunteerService = volunteerService
   }

   async execute(data: VolunteerToCreateDto, confPassword: string): Promise<Volunteer> {
      if (!this.isValidField(data.password)) throw new Error("Preencha o campo de senha.");
      if (!this.isValidField(data.name)) throw new Error("Preencha o campo de nome.");
    //   if(!this.isValidPassword(password)) throw new Error("A senha deve possuir entre 8 e 20 caracteres, contendo números e letras maiúscula e minusculas.")
      if (!this.isPasswordEqual(data.password, confPassword)) throw new Error("As senhas não coincidem");
    //   if (!this.isValidEmail(email)) throw new Error("Insira um email válido.");

      const createdUser = await this.volunteerService.create(data);

      return createdUser;
   }
   
   private isValidField(field: string): boolean {
      return field !== ""
   }

   private isPasswordEqual(password: string, confPassword: string) {
      return password === confPassword
    }

   // private isValidPassword(password: string) {
   //    const passwordValidation = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/
   //    return passwordValidation.test(password)
   //  }


   // private isValidEmail = (email: string) => {
   //    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   //    if (emailValidation.test(email) || email.length === 0) {
   //       return true;
   //    }
   //    return false;
   // }
}