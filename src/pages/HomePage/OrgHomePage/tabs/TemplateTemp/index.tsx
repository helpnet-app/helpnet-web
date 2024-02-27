import { useEffect, useState } from "react";
import { Header } from "../../../../../components/Header";
import { Org } from "../../../../../entities/Org";

import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import "./styles.css";
import OrgService from "../../../../../services/OrgService";
import { FindOrgById } from "../../../../../use_cases/Org/FindByIdUC";

const findById = new FindOrgById(new OrgService())

export const CreateProgram: React.FC = () => {
  // Authenticated Org
  const [authenticatedOrg, setAuthenticatedOrg] = useState<Org>();

  useEffect(() => {
    async function fetch() {
      const id_org = localStorage.getItem("id_org");

      if(id_org) {

        const org = await findById.execute(id_org);
        if(org) setAuthenticatedOrg(org);
      }
    }

    fetch();
  }, []);

  if (!authenticatedOrg)
    return (
      <div className="create-program-tab loading">
        <LoadingSpinner />
        <label className="font-text">
          Carregando informações de organização
        </label>
      </div>
    );

  return (
    <div className="create-program-tab">
      <Header title="Criar programa de voluntariado" />
    </div>
  );
};
