import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class DeleteProgramUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_prog: string): Promise<Program> {

      const finishedProgram = await this.programService.deleteProg(id_prog);

      return finishedProgram;
   }

}