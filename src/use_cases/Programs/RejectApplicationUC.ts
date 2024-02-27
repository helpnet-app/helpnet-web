import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class RejectApplicationUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_application: string): Promise<Program> {

      const rejectedApplication = await this.programService.rejectApplication(id_application);

      return rejectedApplication;
   }

}