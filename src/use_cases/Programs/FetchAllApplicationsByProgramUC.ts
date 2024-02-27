import { Application } from "../../entities/Application";
import ProgramService from "../../services/ProgramService";

export class FetchAllApplicationsByProgram {
  constructor(private readonly programService: ProgramService) {}

  async execute(id_prog: string): Promise<Application[]> {
    return this.programService.fetchAllApplicationsByProgram(id_prog);
  }
}
