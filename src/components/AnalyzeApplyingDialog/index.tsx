import { IoMdClose as CloseIcon } from "react-icons/io";
import { Program } from "../../entities/Program";

import "./styles.css";

interface Props {
  org: Org;
  volunteer: Volunteer;
  program: Program;
  application: Application;
  close: () => void;
  next: () => void;
  last: () => void;
}

import { Application } from "../../entities/Application";
import { Org } from "../../entities/Org";
import { Volunteer } from "../../entities/Volunteer";
import { useNotification } from "../../hooks/useNotification";

export const AnalyzeApplyingDialog: React.FC<Props> = ({
  program,
  org,
  volunteer,
  application,
  last,
  next,
  close,
}) => {
  const { pushNotification } = useNotification();

  function handleApprove() {
    // TODO: create a service to approve the application of a user
    const wasUpdated = false;
    // =====================================================

    if (wasUpdated) {
      pushNotification({
        message: "Usuário aprovado",
        type: "success",
      });
      return close();
    }

    pushNotification({
      message: "Erro na aprovação",
      type: "error",
    });
  }

  function handleDeny() {
    // TODO: create a service to deny the application of a user
    const wasUpdated = false;
    // =====================================================
    if (wasUpdated) {
      pushNotification({
        message: "Usuário reprovado",
        type: "success",
      });
      return close();
    }

    pushNotification({
      message: "Erro na reprovação",
      type: "error",
    });
  }

  return (
    <article className="program-dialog">
      <nav className="nav">
        <button onClick={close} className="close">
          <CloseIcon size={28} />
        </button>
      </nav>
      <header className="header">
        <h1 className="font-title">{volunteer.name}</h1>
      </header>

      <main className="main">
        <label className="font-text">Informações pessoais</label>
        <label className="font-text">
          <span>Nome:</span> {volunteer.name}
        </label>
        <label className="font-text">
          <span>RG:</span> {volunteer.rg}
        </label>
        <label className="font-text">
          <span>CPF:</span> {volunteer.cpf}
        </label>
        <label className="font-text">
          <span>Data de Nascimento:</span> {volunteer.birthday}
        </label>
        <label className="font-text">
          <span>Mora em:</span> {volunteer.country},{volunteer.state},
          {volunteer.city}
        </label>
        <label className="font-text">
          <span>E-mail:</span> {volunteer.email}
        </label>
        <label className="font-text">
          <span>Telefone:</span> {volunteer.phone}
        </label>
        <label className="font-text">
          <span>WhatsApp:</span> {volunteer.whatsapp}
        </label>

        <label className="font-label">Descrição pessoal</label>
        <p className="font-text">{application.questions.personalDescription}</p>

        <label className="font-label">
          Já atuou como voluntário antes? Se sim, descreva como foi sua
          experiência.
        </label>

        <p className="font-text">{application.questions.experience}</p>

        <label className="font-label">
          Horário de dedicação (Disponibilidade)
        </label>

        <p className="font-text">
          Dias da semana: {application.questions.schedule.days.join(", ")} |
          Horários
          {application.questions.schedule.period.join(" e")}
        </p>
      </main>

      <div className="actions">
        <div className="inline">
          <button onClick={handleDeny} className="button font-label erro s">
            REPROVAR
          </button>
          <button onClick={last} className="button font-label themed-outline s">
            VOLTAR
          </button>
          <button onClick={next} className="button font-label themed-outline s">
            PULAR
          </button>

          <button
            onClick={handleApprove}
            className="button font-label success l"
          >
            APROVAR
          </button>
        </div>
      </div>
    </article>
  );
};
