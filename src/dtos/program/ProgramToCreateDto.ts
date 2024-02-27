import { ModeEnum } from "../../entities/enum/mode_enum";

export interface ProgramToCreateDto {
  title: string;
  mode: ModeEnum;
  duration: number;
  description: string;
  nSpots: number;
  tags: string[];
}
