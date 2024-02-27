import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class StartProgramUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_prog: string): Promise<Program> {

      const startedProgram = await this.programService.startProg(id_prog);

      return startedProgram;
   }

}