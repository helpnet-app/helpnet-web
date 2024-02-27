import { useEffect, useState } from "react";
import { Header } from "../../../../../components/Header";
import { ProgramCard } from "../../../../../components/ProgramCard";
import { Org } from "../../../../../entities/Org";
import { Program } from "../../../../../entities/Program";

import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { ProgramDialog } from "../../../../../components/ProgramDialog";
import { useDialog } from "../../../../../hooks/useDialog";
import { useInputDelay } from "../../../../../hooks/useInputDelay";
import ProgramService from "../../../../../services/ProgramService";
import { FetchAll } from "../../../../../use_cases/Programs/FetchAllUC";
import "./styles.css";

const fetchAllPrograms = new FetchAll(new ProgramService());

export const ProgramList: React.FC = () => {
  const { dialogRef, openDialog, closeDialog } = useDialog();
  const { handleChange } = useInputDelay(handleFilter);
  // List of programs
  const [programs, setPrograms] = useState<Program[]>();
  const [programs2Show, setPrograms2Show] = useState<Program[]>();

  // Selected programs
  const [selectedPrograms, setSelectedPrograms] = useState<Program>();

  // Authenticated Org
  const [authenticatedOrg, setAuthenticatedOrg] = useState<Org>();

  useEffect(() => {
    async function fetch() {
      fetchAllPrograms.execute().then((data) => {
        setPrograms(data);
        setPrograms2Show(data);
      });

      // TODO: create a service to get the authenticated user (role = 'org')
      const org: Org = {
        cep: "TESTE",
        city: "TESTE",
        cnpj: "TESTE",
        country: "TESTE",
        district: "TESTE",
        email: "TESTE",
        name: "Org de Exemplo",
        password: "TESTE",
        phone: "TESTE",
        state: "TESTE",
        username: "TESTE",
        whatsapp: "TESTE",
        tradeName: "TESTE",
        houseNumber: "TESTE",
        createdAt: new Date(),
        _id: "001",
      };
      setAuthenticatedOrg(org);
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
    if (!authenticatedOrg) return;

    return (
      <li
        key={`program-card-${index}`}
        className="program"
        onClick={() => {
          openDialog();
          setSelectedPrograms(program);
        }}
      >
        <ProgramCard org={authenticatedOrg} program={program} />
      </li>
    );
  }

  if (!authenticatedOrg)
    return (
      <div className="program-list-tab loading">
        <LoadingSpinner />
        <label className="font-text">
          Carregando informações de organização
        </label>
      </div>
    );

  return (
    <div className="program-list-tab">
      <Header title={`Olá, seja bem-vindo (a) ${authenticatedOrg.name}`} />
      <div className="actions">
        <input
          onChange={handleChange}
          type="text"
          className="input"
          placeholder="Pesquisar por programas de voluntariado"
        />
      </div>
      <label className="font-label">Meus programas de voluntariado</label>

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
                Não há programas cadastrados. Realize o cadastro de um programa
                de voluntariado primeiro.
              </p>
            </li>
          )
        ) : (
          programs2Show.map(renderProgram)
        )}
      </ul>

      <dialog ref={dialogRef} className="dialog">
        {selectedPrograms && (
          <ProgramDialog
            close={closeDialog}
            program={selectedPrograms}
            org={authenticatedOrg}
          />
        )}
      </dialog>
    </div>
  );
};
