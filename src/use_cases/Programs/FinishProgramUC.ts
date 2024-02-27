import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class FinishProgramUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_prog: string): Promise<Program> {

      const finishedProgram = await this.programService.finishProg(id_prog);

      return finishedProgram;
   }

}