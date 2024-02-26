import { SyntheticEvent } from "react";
import DefaultImg from "../../assets/default.svg";
import { Org } from "../../entities/Org";
import { ModeEnum } from "../../entities/enum/mode_enum";
import { ProgramStatusEnum } from "../../entities/enum/program_status_enum";
import { Program } from "../../entities/program";
import { Tag } from "../Tag";
import "./styles.css";

const STATUS_TEXT = {
  [ProgramStatusEnum.CREATED]: "Não Iniciado",
  [ProgramStatusEnum.FINISHED]: "Finalizado",
  [ProgramStatusEnum.ON_GOING]: "Em Andamento",
};

const MODE_TEXT = {
  [ModeEnum.HYBRID]: "Híbrido",
  [ModeEnum.ONLINE]: "Online",
  [ModeEnum.IN_PERSON]: "Presencial",
};

interface Props {
  program: Program;
  org: Org;
  statusVisible?: boolean;
}

export const ProgramCard: React.FC<Props> = ({
  program,
  org,
  statusVisible = true,
}) => {
  const shortFormOfDescription = program.description.substring(0, 100) + "...";

  // ================= RENDERING =====================
  function handleImageError(
    event: SyntheticEvent<HTMLImageElement>,
    imagePath: string,
    cb?: (event: SyntheticEvent<HTMLImageElement>) => void
  ) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = imagePath;
    console.clear();
    if (cb) {
      cb(event);
    }
  }

  return (
    <article className="program-card">
      <div className="image-group">
        <img
          onError={(event) => handleImageError(event, DefaultImg)}
          src={program.pictureLink || DefaultImg}
          className="image"
        />
        {statusVisible && (
          <Tag
            content={STATUS_TEXT[program.status]}
            type={
              program.status === ProgramStatusEnum.CREATED
                ? "todo"
                : program.status === ProgramStatusEnum.ON_GOING
                ? "inprogress"
                : "finished"
            }
          />
        )}
      </div>

      <h2 className="font-title-2">{program.title}</h2>

      <div className="tags">
        <Tag content={`${org.country}, ${org.district}`} type="v4" />
        <Tag content={MODE_TEXT[program.mode]} type="v5" />
      </div>

      <p className="font-text">{shortFormOfDescription}</p>

      <div className="blur">
        <label className="font-label">Ver Mais</label>
      </div>
    </article>
  );
};
