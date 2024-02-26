import { useEffect, useState } from "react";
import { Header } from "../../../../../components/Header";
import { Org } from "../../../../../entities/Org";

import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import "./styles.css";

export const CreateProgram: React.FC = () => {
  // Authenticated Org
  const [authenticatedOrg, setAuthenticatedOrg] = useState<Org>();

  useEffect(() => {
    async function fetch() {
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
