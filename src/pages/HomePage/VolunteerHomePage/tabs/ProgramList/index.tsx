import { useEffect, useState } from "react";
import { Header } from "../../../../../components/Header";
import { ProgramCard } from "../../../../../components/ProgramCard";
import { Program } from "../../../../../entities/Program";

import { ApplyProgramDialog } from "../../../../../components/ApplyProgramDialog";
import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { Volunteer } from "../../../../../entities/Volunteer";
import { ProgramStatusEnum } from "../../../../../entities/enum/program_status_enum";
import { useDialog } from "../../../../../hooks/useDialog";
import { useInputDelay } from "../../../../../hooks/useInputDelay";
import ProgramService from "../../../../../services/ProgramService";
import { FetchAll } from "../../../../../use_cases/Programs/FetchAllUC";
import "./styles.css";
import { FindVolById } from "../../../../../use_cases/Volunteer/FindByIdUC";
import VolunteerService from "../../../../../services/VolunteerService";

const fetchAllPrograms = new FetchAll(new ProgramService());
const findById = new FindVolById(new VolunteerService())

export const ProgramList: React.FC = () => {
  const { dialogRef, openDialog, closeDialog } = useDialog();
  const { handleChange } = useInputDelay(handleFilter);
  // List of programs
  const [programs, setPrograms] = useState<Program[]>();
  const [programs2Show, setPrograms2Show] = useState<Program[]>();

  // Selected programs
  const [selectedProgram, setSelectedPrograms] = useState<Program>();

  // Authenticated Org
  const [authenticatedVolunteer, setAuthenticatedVolunteer] =
    useState<Volunteer>();

  useEffect(() => {
    async function fetch() {
      const id_vol = localStorage.getItem("id_vol");


      if(id_vol) {
        const org = await findById.execute(id_vol);
        if(org) setAuthenticatedVolunteer(org);

        fetchAllPrograms.execute().then((data) => {
          setPrograms(data);
          setPrograms2Show(data);
        });

      }
    }

    fetch();
  }, []);

  function handleFilter(value: string) {
    if (value === "") return setPrograms2Show(programs);
    if (!programs) return;
    const filteredPrograms: Program[] = programs.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setPrograms2Show(filteredPrograms);
  }

  //   ================= RENDERING =================

  function renderProgram(program: Program, index: number) {
    if (
      !authenticatedVolunteer ||
      program.status !== ProgramStatusEnum.CREATED ||
      !program.organization
    )
      return;

    return (
      <li
        key={`program-card-${index}`}
        className="program"
        onClick={() => {
          openDialog();
          setSelectedPrograms(program);
        }}
      >
        <ProgramCard org={program.organization} program={program} />
      </li>
    );
  }

  if (!authenticatedVolunteer)
    return (
      <div className="program-list-tab loading">
        <LoadingSpinner />
        <label className="font-text">Carregando suas informações</label>
      </div>
    );

  return (
    <div className="program-list-tab">
      <Header
        title={`Olá, seja bem-vindo (a) ${authenticatedVolunteer.name}`}
      />
      <div className="actions">
        <input
          onChange={handleChange}
          type="text"
          className="input"
          placeholder="Pesquisar por programas de voluntariado"
        />
      </div>
      <label className="font-label">Programas cadastrados</label>

      <ul className="programs">
        {programs2Show === undefined ? (
          <li className="inner loading">
            <LoadingSpinner />
            <label className="font-text">Carregando programas</label>
          </li>
        ) : programs2Show.length === 0 ? (
          programs && programs?.length > 0 ? (
            <li className="inner">
              <p className="font-text">
                Nenhum programa encontrado com este termo.
              </p>
            </li>
          ) : (
            <li className="inner">
              <p className="font-text">
                Não há programas cadastrados no momento. Mas fique de olhos!
              </p>
            </li>
          )
        ) : (
          programs2Show.map(renderProgram)
        )}
      </ul>

      <dialog ref={dialogRef} className="dialog">
        {selectedProgram && selectedProgram.organization && (
          <ApplyProgramDialog
            close={closeDialog}
            org={selectedProgram.organization}
            program={selectedProgram}
          />
        )}
      </dialog>
    </div>
  );
};
