import { Program } from "../../entities/Program";
import ProgramService from "../../services/ProgramService";

export class FetchAll {
  constructor(private readonly programService: ProgramService) {}

  async execute(): Promise<Program[]> {
    return this.programService.fetchAll();
  }
}
