import { IoMdClose as CloseIcon } from "react-icons/io";
import { Program } from "../../entities/Program";
import "./styles.css";

interface Props {
  org: Org;
  program: Program;
  close: () => void;
}

import DefaultImg from "../../assets/default.svg";
import { Org } from "../../entities/Org";
import { useForm } from "../../hooks/useForm";
import { useNotification } from "../../hooks/useNotification";
import { MODE_TEXT } from "../ProgramCard/strings";
import { Tag } from "../Tag";

interface FormResponse {
  personalDescription: string;
  xp: string;
  freeWeekdays: string[] | string;
  freeTimes: string[] | string;
}

export const ApplyProgramDialog: React.FC<Props> = ({
  program,
  org,
  close,
}) => {
  const { pushNotification } = useNotification();
  const { formRef, handleSubmit } = useForm(handleApplying);

  function handleApplying(data: FormResponse) {
    const parsedData = {
      ...data,
      freeWeekdays:
        data.freeWeekdays instanceof Array
          ? data.freeWeekdays
          : [data.freeWeekdays],
      freeTimes:
        data.freeTimes instanceof Array ? data.freeTimes : [data.freeTimes],
    };

    // TODO: create a service to apply for a program
    console.log(parsedData); // REMOVE
    const isApplied = false;
    // ============================================

    if (isApplied) {
      pushNotification(
        {
          message: "Formulário enviado com sucesso. Boa sorte!",
          type: "success",
        },
        true
      );
      setTimeout(() => window.location.reload(), 3000);
      return;
    }
    pushNotification(
      {
        message: "Falha ao enviar formulário",
        type: "error",
      },
      true
    );
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
        <h2 className="font-title-2">Formulário de Aplicação</h2>
        <p className="font-text">
          Responda as perguntas a seguir para realização da sua avaliação de
          candidatura. Seja sincero em suas respostas pois elas serão levadas em
          consideração na sua aprovação. Boa sorte!
        </p>
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="form"
        >
          <div className="form-group">
            <label className="font-label">
              Descrição pessoal (fale um pouco sobre você, suas competências,
              formações, qualidades)
            </label>
            <textarea
              name="personalDescription"
              className="textarea"
              placeholder="Digite aqui"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="font-label">
              Você já atuou como voluntário antes? Descreva para a gente como
              foi sua experiência ou, se ainda não teve alguma oportunidade, nos
              conte um pouco sobre o que você busca (aprender, conhecer,
              vivenciar) aplicando para esta vaga.
            </label>
            <textarea
              name="xp"
              className="textarea"
              placeholder="Digite aqui"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="font-label">
              Qual a sua disponibilidade de tempo para atuar nas atividades
              deste programa de voluntariado?
            </label>

            <div className="inline">
              <div className="left">
                <label className="font-label">Dias da Semana</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    value="Segunda-feira"
                    name="freeWeekdays"
                  />
                  <label className="font-text">Segunda-feira</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    value="Terça-feira"
                    name="freeWeekdays"
                  />
                  <label className="font-text">Terça-feira</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    value="Quarta-feira"
                    name="freeWeekdays"
                  />
                  <label className="font-text">Quarta-feira</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    value="Quinta-feira"
                    name="freeWeekdays"
                  />
                  <label className="font-text">Quinta-feira</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    value="Sexta-feira"
                    name="freeWeekdays"
                  />
                  <label className="font-text">Sexta-feira</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" value="Sábado" name="freeWeekdays" />
                  <label className="font-text">Sábado</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" value="Domingo" name="freeWeekdays" />
                  <label className="font-text">Domingo</label>
                </div>
              </div>

              <div className="right">
                <label className="font-label">Horários</label>
                <div className="checkbox-group">
                  <input type="checkbox" value="Manhã" name="freeTimes" />
                  <label className="font-text">Manhã</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" value="Tarde" name="freeTimes" />
                  <label className="font-text">Tarde</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" value="Noite" name="freeTimes" />
                  <label className="font-text">Noite</label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <div className="actions">
        <div className="inline">
          <button
            onClick={handleSubmit}
            className="button success font-label s"
          >
            APLICAR PARA ESTE PROGRAMA
          </button>
        </div>
      </div>
    </article>
  );
};
