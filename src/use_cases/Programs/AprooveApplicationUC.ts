import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class AprooveApplicationUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_application: string): Promise<Program> {

      const aproovedApplication = await this.programService.aprooveApplication(id_application);

      return aproovedApplication;
   }

}