import {
  IoMdClose as CloseIcon,
  IoMdDownload as DownloadIcon,
} from "react-icons/io";
import { Program } from "../../entities/Program";

import "./styles.css";

interface Props {
  org: Org;
  volunteer: Volunteer;
  program: Program;
  close: () => void;
}

import DefaultImg from "../../assets/default.svg";
import { Org } from "../../entities/Org";
import { Volunteer } from "../../entities/Volunteer";
import { ProgramStatusEnum } from "../../entities/enum/program_status_enum";
import { MODE_TEXT } from "../ProgramCard/strings";
import { Tag } from "../Tag";
import GenerateUC from "../../use_cases/Certificate/GenerateUC";
import CertificateService from "../../services/CertificateService";

const generateCertificate = new GenerateUC(new CertificateService())

export const ProgramDialogVolunteer: React.FC<Props> = ({
  program,
  org,
  volunteer,
  close,
}) => {
  async function handleDownloadCertificate() {
    const generatedCertificate = await generateCertificate.execute(program._id, volunteer._id)
  }

  // ================= RENDERING ==================

  function renderTag(tag: string, index: number) {
    return <Tag key={`tag-dialog-${index}`} content={tag} type="outline" />;
  }

  return (
    <article className="program-dialog">
      <nav className="nav">
        <button onClick={close} className="close">
          <CloseIcon size={28} />
        </button>
      </nav>
      <header className="header">
        <img src={program.pictureLink || DefaultImg} className="img" />
        <div className="info">
          <h2 className="font-title-2">{program.title}</h2>
          <span className="font-mini-text">
            Oferecido por <span>{org.name}</span>
          </span>
          <div className="tags">
            <Tag content={`${org.country}, ${org.district}`} type="v4" />
            <Tag content={MODE_TEXT[program.mode]} type="v5" />

            {program.tags.map(renderTag)}
          </div>
          <span className="font-mini-text">
            Duração de <span>{program.duration} dias</span>
          </span>
          <span className="font-mini-text">
            São ofertadas cerca de <span>{program.nSpots} vagas</span>
          </span>
        </div>
      </header>

      <main className="main">
        <label className="font-label">Descrição</label>
        <p className="font-text">{program.description}</p>
        <label className="font-label">Anexos</label>
        {program.status === ProgramStatusEnum.FINISHED ? (
          <button
            onClick={handleDownloadCertificate}
            className="button normal font-label"
          >
            <label className="font-label">Certificado de Participação</label>
            <DownloadIcon size={32} />
          </button>
        ) : (
          <label className="font-text">Nenhum anexo disponível.</label>
        )}
      </main>
    </article>
  );
};
