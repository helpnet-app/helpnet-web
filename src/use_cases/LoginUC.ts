import UserService from "../services/AuthService";
import { User } from "../entities/User";

export default class Login {

   private userService: UserService;

   constructor(userService: UserService) {
      this.userService = userService
   }

   async execute(email: string, password: string): Promise<User> {

      if (!this.isValidField(password)) throw new Error("Preencha o campo de senha.");
      if (!this.isValidField(email)) throw new Error("Preencha o campo de email.");
   
      const loggedUser = await this.userService.login(email, password);

      return loggedUser;
   }

   private isValidField(field: string): boolean {
      return field !== ""
   }
}