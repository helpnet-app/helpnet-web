import { Org } from "../../entities/Org";
import OrgService from "../../services/OrgService";

export default class CreateOrg {

   private orgService: OrgService;

   constructor(orgService: OrgService) {
      this.orgService = orgService
   }

   async execute(data: Org): Promise<Org> {
      if (!this.isValidField(data.password)) throw new Error("Preencha o campo de senha.");
      if (!this.isValidField(data.username)) throw new Error("Preencha o campo de nome.");
    //   if(!this.isValidPassword(password)) throw new Error("A senha deve possuir entre 8 e 20 caracteres, contendo números e letras maiúscula e minusculas.")
    //   if (!this.isPasswordEqual(password, confPassword)) throw new Error("As senhas não coincidem");
    //   if (!this.isValidEmail(email)) throw new Error("Insira um email válido.");

      const createdUser = await this.orgService.create(data);

      return createdUser;
   }
   
   private isValidField(field: string): boolean {
      return field !== ""
   }

   // private isPasswordEqual(password: string, confPassword: string) {
   //    return password === confPassword
   //  }

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