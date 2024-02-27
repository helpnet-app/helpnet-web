import { ChangeEvent, useEffect, useState } from "react";
import {
  IoIosArrowForward as ArrowIcon,
  IoMdClose as CloseIcon,
} from "react-icons/io";
import { Program } from "../../entities/Program";
import "./styles.css";

interface Props {
  org: Org;
  program: Program;
  close: () => void;
}

import DefaultImg from "../../assets/default.svg";
import { Org } from "../../entities/Org";
import { User } from "../../entities/User";
import { ProgramStatusEnum } from "../../entities/enum/program_status_enum";
import { useInputDelay } from "../../hooks/useInputDelay";
import { useNotification } from "../../hooks/useNotification";
import { LoadingSpinner } from "../LoadingSpinner";
import { MODE_TEXT } from "../ProgramCard/strings";
import { Tag } from "../Tag";
import { FetchAllApplicationsByProgram } from "../../use_cases/Programs/FetchAllApplicationsByProgramUC";
import ProgramService from "../../services/ProgramService";
import StartProgramUC from "../../use_cases/Programs/StartProgramUC";
import FinishProgramUC from "../../use_cases/Programs/FinishProgramUC";

const fetchAllApplicationsByProgram = new FetchAllApplicationsByProgram(new ProgramService())
const startProgram = new StartProgramUC(new ProgramService())
const finishProgram = new FinishProgramUC(new ProgramService())

export const ProgramDialog: React.FC<Props> = ({ program, org, close }) => {
  const { pushNotification } = useNotification();
  // Filtering users
  const { handleChange } = useInputDelay(handleFilterUsers);

  // Candidates
  const [users, setUsers] = useState<User[]>();
  const [users2Show, setUsers2Show] = useState<User[]>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Approved Candidates
  const [approvedUsers, setApprovedUsers] = useState<User[]>();

  useEffect(() => {
    async function fetch() {
      
      fetchAllApplicationsByProgram.execute(program.id).then((data) => {
        setUsers(data);
        setUsers2Show(data);
      })

      // TODO: fetch approved users
      const tempApprovedUsers: User[] = [
        {
          _id: "teste",
          name: "teste",
          username: "teste",
          email: "teste",
          password: "teste",
          phone: "teste",
          whatsapp: "teste",
          cep: "teste",
          city: "teste",
          country: "teste",
          district: "teste",
          houseNumber: "teste",
          state: "teste",
          createdAt: new Date(),
        },
      ];

      setApprovedUsers(tempApprovedUsers);
      
    }

    fetch();
  }, []);

  async function handleInitProgram() {
    
    const startedProgram = await startProgram.execute(program.id);

    if (startedProgram) {
      pushNotification(
        {
          message: "Programa iniciado com sucesso.",
          type: "success",
        },
        true
      );
      setTimeout(() => window.location.reload(), 2000);
      return;
    }

    pushNotification(
      {
        message: "Falha ao iniciar programa.",
        type: "error",
      },
      true
    );
  }

  async function handleDeleteProgram() {
    // TODO: create service to delete a program
    const wasUpdated = false;
    // =========================================

    if (wasUpdated) {
      pushNotification(
        {
          message: "Programa deletado com sucesso.",
          type: "success",
        },
        true
      );
      setTimeout(() => window.location.reload(), 2000);
      return;
    }

    pushNotification(
      {
        message: "Falha ao deletar programa.",
        type: "error",
      },
      true
    );
  }

  async function handleFinishProgram() {

    const startedProgram = await finishProgram.execute(program.id);


    if (startedProgram) {
      pushNotification(
        {
          message: "Programa finalizado com sucesso.",
          type: "success",
        },
        true
      );
      setTimeout(() => window.location.reload(), 2000);
      return;
    }

    pushNotification(
      {
        message: "Falha ao finalizar programa.",
        type: "error",
      },
      true
    );
  }

  function handleFilterUsers(query: string) {
    if (!users || !approvedUsers) return;
    if (query === "") return setUsers2Show(users);
    const filteredUsers = users.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    );
    setUsers2Show(filteredUsers);
  }

  function handleChangeCandidate(
    event: ChangeEvent<HTMLInputElement>,
    user: User
  ) {
    const { checked } = event.currentTarget;
    if (checked) return handleCheckUser(user);
    return handleUncheckUser(user);
  }

  function handleCheckUser(user: User) {
    setSelectedUsers([...selectedUsers, user]);
  }

  function handleUncheckUser(user: User) {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  }

  // ================= RENDERING ==================

  function renderTag(tag: string, index: number) {
    return <Tag key={`tag-dialog-${index}`} content={tag} type="outline" />;
  }

  function renderCandidate(candidate: User, index: number) {
    if (approvedUsers?.find((u) => u._id === candidate._id))
      return renderApprovedCandidate(candidate, index);
    return (
      <li key={`candidate-${index}`} className="candidate">
        <input
          type="checkbox"
          onChange={(e) => handleChangeCandidate(e, candidate)}
        />
        <label className="text">{candidate.name}</label>
        <ArrowIcon size={24} />
      </li>
    );
  }

  function renderApprovedCandidate(candidate: User, index: number) {
    return (
      <li key={`candidate-${index}`} className="candidate approved">
        {program.status === ProgramStatusEnum.ON_GOING && (
          <input
            type="checkbox"
            onChange={(e) => handleChangeCandidate(e, candidate)}
          />
        )}
        <label className="text">{candidate.name}</label>
        <ArrowIcon size={24} />
      </li>
    );
  }

  function renderVolunteer(volunteer: User, index: number) {
    return (
      <li key={`volunteer-${index}`} className="candidate">
        <label className="text">{volunteer.name}</label>
        <ArrowIcon size={24} />
      </li>
    );
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

        <label className="font-label">
          {program.status === ProgramStatusEnum.ON_GOING
            ? "Voluntários"
            : "Candidatos"}
        </label>
        <input
          type="text"
          onChange={handleChange}
          className="input"
          placeholder="Pesquisar por candidato"
        />

        <div className="inline">
          <span className="font-mini-text">
            <span>Total:</span> {users?.length || 0} candidatos
          </span>
          <span className="font-mini-text">
            <span>Aprovados:</span> {approvedUsers?.length || 0} candidatos
          </span>
        </div>

        <ul className="candidates">
          {users2Show === undefined || approvedUsers === undefined ? (
            <li className="inner">
              <LoadingSpinner />
              <label className="font-mini-text">
                Carregando lista de{" "}
                {program.status === ProgramStatusEnum.ON_GOING
                  ? "voluntários"
                  : "candidatos"}
                ...
              </label>
            </li>
          ) : users2Show !== undefined && users2Show.length === 0 ? (
            <li className="inner">
              <label className="font-mini-text">
                Nenhum usuário para listar.
              </label>
            </li>
          ) : program.status === ProgramStatusEnum.CREATED ? (
            users2Show.map(renderCandidate)
          ) : program.status === ProgramStatusEnum.ON_GOING ? (
            approvedUsers.map(renderVolunteer)
          ) : (
            approvedUsers.map(renderApprovedCandidate)
          )}
        </ul>

        {program.status !== ProgramStatusEnum.FINISHED && (
          <div className="inline">
            <span className="font-mini-text">
              {selectedUsers.length} usuários selecionados
            </span>
          </div>
        )}
      </main>

      <div className="actions">
        <div className="inline">
          {program.status === ProgramStatusEnum.CREATED && (
            <>
              <button
                className="button themed-outline font-label s select-users"
                disabled={selectedUsers.length === 0}
              >
                ANALISAR SELECIONADOS
              </button>
              <button className="button themed-outline font-label s">
                ANALISAR TODOS
              </button>
            </>
          )}
          {program.status === ProgramStatusEnum.ON_GOING && (
            <button
              onClick={handleFinishProgram}
              className="button error font-label s"
            >
              REMOVER SELECIONADOS
            </button>
          )}
        </div>
        <div className="inline">
          <button
            onClick={handleDeleteProgram}
            className="button error font-label s"
          >
            APAGAR PROGRAMA
          </button>

          {program.status === ProgramStatusEnum.CREATED && (
            <button
              onClick={handleInitProgram}
              className="button success font-label m"
            >
              INICIAR PROGRAMA
            </button>
          )}
          {program.status === ProgramStatusEnum.ON_GOING && (
            <button
              onClick={handleFinishProgram}
              className="button success font-label m"
            >
              FINALIZAR PROGRAMA
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
