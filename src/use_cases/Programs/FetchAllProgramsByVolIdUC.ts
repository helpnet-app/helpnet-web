import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export class FetchAllProgramsByVolId {
  constructor(private readonly programService: ProgramService) {}

  async execute(id_vol: string): Promise<Program[]> {
    return this.programService.fetchAllProgramsByVolId(id_vol);
  }
}
