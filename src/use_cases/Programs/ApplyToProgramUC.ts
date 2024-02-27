import { Questions } from "../../entities/Application";
import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class ApplyToProgramUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(id_prog: string, id_vol: string, questions: Questions): Promise<Program> {

      const aplliedProgram = await this.programService.applyToProg(id_prog, id_vol, questions);

      return aplliedProgram;
   }

}