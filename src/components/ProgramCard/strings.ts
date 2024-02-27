import { ModeEnum } from "../../entities/enum/mode_enum";
import { ProgramStatusEnum } from "../../entities/enum/program_status_enum";

export const STATUS_TEXT = {
  [ProgramStatusEnum.CREATED]: "Não Iniciado",
  [ProgramStatusEnum.FINISHED]: "Finalizado",
  [ProgramStatusEnum.ON_GOING]: "Em Andamento",
};

export const MODE_TEXT = {
  [ModeEnum.HYBRID]: "Híbrido",
  [ModeEnum.ONLINE]: "Online",
  [ModeEnum.IN_PERSON]: "Presencial",
};
