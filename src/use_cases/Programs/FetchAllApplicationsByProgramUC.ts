import { Volunteer } from "../../entities/Volunteer";
import ProgramService from "../../services/ProgramService";

export class FetchAllApplicationsByProgram {
  constructor(private readonly programService: ProgramService) {}

  async execute(id_prog: string): Promise<Volunteer[]> {
    return this.programService.fetchAllApplicationsByProgram(id_prog);
  }
}
