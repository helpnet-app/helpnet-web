import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Header } from "../../../../../components/Header";
import { Org } from "../../../../../entities/Org";

import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { Tag } from "../../../../../components/Tag";
import { ModeEnum } from "../../../../../entities/enum/mode_enum";
import { useForm } from "../../../../../hooks/useForm";
import { useNotification } from "../../../../../hooks/useNotification";
import "./styles.css";

interface FormResponse {
  ch: string;
  description: string;
  file: File;
  mode: "1" | "2" | "3";
  nSpot: string;
  title: string;
}

export const CreateProgram: React.FC = () => {
  const { formRef, handleSubmit } = useForm(onSubmit);
  const { pushNotification } = useNotification();
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Tags
  const [tags, setTags] = useState<string[]>([]);

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

  function onSubmit(data: FormResponse) {
    const parsedData = {
      ...data,
      mode: parseInt(data.mode) as ModeEnum,
      nSpot: parseInt(data.nSpot),
      ch: parseInt(data.ch),
    };

    // TODO: create a service to create a new program
    const wasCreated = true;
    // ==============================================

    if (wasCreated) {
      pushNotification(
        {
          message: "Criação de novo programa realiza com sucesso.",
          type: "success",
        },
        true
      );
      setTimeout(() => window.location.reload(), 2000);
      return;
    }

    pushNotification({
      message: "Erro ao cadastrar novo programa",
      type: "error",
    });
  }

  function handleAddTag(event: KeyboardEvent<HTMLInputElement>) {
    const { key, currentTarget } = event;
    const value = currentTarget["value"];
    if (key === "Enter") {
      event.preventDefault();
      if (!tags.find((t) => t === value)) setTags([...tags, value]);
      if (tagInputRef && tagInputRef.current) tagInputRef.current.value = "";
      return;
    }
  }

  function handleRemoveTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  // ======================== RENDERING ========================
  function renderTag(tag: string, index: number) {
    return (
      <li key={`tag-${index}`} onClick={() => handleRemoveTag(tag)}>
        <Tag content={tag} type="outline" />
      </li>
    );
  }

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

      <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="form">
        <div className="form-group">
          <label className="font-label">Título</label>
          <input
            name="title"
            type="text"
            className="input"
            placeholder="Digite aqui"
          />
        </div>

        <div className="form-group">
          <label className="font-label">Descrição</label>
          <textarea
            name="description"
            className="textarea"
            placeholder="Digite aqui"
          />
        </div>

        <div className="form-group">
          <label className="font-label">Modalidade</label>
          <div className="form-group inline">
            <div className="radio-group">
              <input
                type="radio"
                id="inperson"
                name="mode"
                value={ModeEnum.IN_PERSON}
                defaultChecked
              />
              <label htmlFor="inperson" className="font-text">
                Presencial
              </label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="onlined"
                name="mode"
                value={ModeEnum.ONLINE}
              />
              <label htmlFor="online" className="font-text">
                Online
              </label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="hybrid"
                name="mode"
                value={ModeEnum.HYBRID}
              />
              <label htmlFor="hybrid" className="font-text">
                Híbrido
              </label>
            </div>
          </div>
        </div>

        <div className="form-group inline">
          <div className="form-group s">
            <label className="font-label">C.H. (Carga Horária) em dias</label>
            <input
              type="text"
              name="ch"
              className="input"
              placeholder="Digite aqui"
            />
          </div>

          <div className="form-group s">
            <label className="font-label">Quantidade de vagas</label>
            <input
              name="nSpot"
              type="text"
              className="input"
              placeholder="Digite aqui"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="font-label">Categorias</label>
          <input
            ref={tagInputRef}
            type="text"
            className="input"
            onKeyDown={handleAddTag}
            placeholder="Clique 'Enter' para adicionar uma nova tag "
          />

          <ul className="tags">{tags.map(renderTag)}</ul>
        </div>

        <div className="form-group">
          <label className="font-label">Anexos</label>
          <input
            name="file"
            type="file"
            className="input"
            accept=".pdf,.docx"
          />
        </div>

        <button onClick={handleSubmit} className="button themed font-label">
          ENVIAR
        </button>
      </form>
    </div>
  );
};
