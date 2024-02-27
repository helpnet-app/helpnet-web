import { SyntheticEvent } from "react";
import DefaultImg from "../../assets/default.svg";
import { Org } from "../../entities/Org";
import { Program } from "../../entities/Program";
import { ProgramStatusEnum } from "../../entities/enum/program_status_enum";
import { Tag } from "../Tag";
import { MODE_TEXT, STATUS_TEXT } from "./strings";
import "./styles.css";

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
        <label className="font-label">Clique para ver mais</label>
      </div>
    </article>
  );
};
