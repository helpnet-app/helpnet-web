import UserService from "../services/AuthService";
import { Auth } from "../entities/Auth";

export default class Login {

   private userService: UserService;

   constructor(userService: UserService) {
      this.userService = userService
   }

   async execute(username: string, password: string): Promise<Auth> {

      if (!this.isValidField(password)) throw new Error("Preencha o campo de senha.");
      if (!this.isValidField(username)) throw new Error("Preencha o campo de username.");
   
      const loggedUser = await this.userService.login(username, password);

      return loggedUser;
   }

   private isValidField(field: string): boolean {
      return field !== ""
   }
}