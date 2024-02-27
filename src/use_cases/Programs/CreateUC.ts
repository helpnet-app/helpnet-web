import { ProgramToCreateDto } from "../../dtos/program/ProgramToCreateDto";
import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export default class CreateProgramUC {

   private programService: ProgramService;

   constructor(programService: ProgramService) {
      this.programService = programService
   }

   async execute(data: ProgramToCreateDto, id_org: string): Promise<Program> {

      const createdUser = await this.programService.create(data, id_org);

      return createdUser;
   }

}