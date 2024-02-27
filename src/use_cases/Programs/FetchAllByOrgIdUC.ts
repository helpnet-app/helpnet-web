import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export class FetchAllByOrgId {
  constructor(private readonly programService: ProgramService) {}

  async execute(id_org: string): Promise<Program[]> {
    return this.programService.fetchAllByOrgId(id_org);
  }
}
