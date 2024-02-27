import { useTabs } from "../../hooks/useTabs";
import { useTheme } from "../../hooks/useTheme";
import "./styles.css";

import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo-light.svg";
import OrgImg from "../../assets/org.svg?react";
import VolunteerImg from "../../assets/volunteer.svg?react";
import { useForm } from "../../hooks/useForm";
import { useNotification } from "../../hooks/useNotification";
import { Volunteer } from "../../entities/Volunteer";
import { Org } from "../../entities/Org";
import CreateOrg from "../../use_cases/Org/CreateUC";
import CreateVolunteer from "../../use_cases/Volunteer/CreateUC";
import OrgService from "../../services/OrgService";
import VolunteerService from "../../services/VolunteerService";
import { useState } from "react";

const createOrg = new CreateOrg(new OrgService());
const createVolunteer = new CreateVolunteer(new VolunteerService())


interface FormResponseVolunteer extends Volunteer{
  confirmPassword: string;
}

interface FormResponseOrg extends Org{
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const { isTab, nextStep, backStep } = useTabs();
  const { formRef, handleSubmit } = useForm(onSubmit);
  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  async function onSubmit(data: FormResponseVolunteer | FormResponseOrg) {
    const isVolunteer = currentTheme === "volunteer";
    const {confirmPassword, ...rest} = data;
    

    let isCreated; // TODO: update variable with request status
    if (isVolunteer) {
      const volunteerData = rest as Volunteer;
      isCreated = await createVolunteer.execute(volunteerData, confirmPassword);
      
    } else {
      const orgData = rest as Org;
      isCreated = await createOrg.execute(orgData, confirmPassword);
      
    }

    if (!isCreated)
      return pushNotification({
        message:
          "Erro ao realizar cadastro de informações. Verifique os campos e tente novamente.",
        type: "error",
      });

    navigate("/");
  }

  return (
    <div className={`register-page theme ${currentTheme}`}>
      <div className="side-bar">
        <img className="logo" src={LogoImg} alt="HelpNet" />
      </div>

      <main className="main">
        <h1 className="title font-title">Cadastre-se</h1>

        <header className="header">
          <label
            className={`step-title form-text ${isTab(0) ? "selected" : ""}`}
          >
            Papel
          </label>
          <label
            className={`step-title form-text ${isTab(1) ? "selected" : ""}`}
          >
            Sua Conta
          </label>
          <label
            className={`step-title form-text ${isTab(2) ? "selected" : ""}`}
          >
            Informações
          </label>
        </header>

        {/* =================== TABS ================= */}

        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="steps"
        >
          <div className={`step one ${isTab(0) ? "show" : ""}`}>
            <label className="font-text">Desejo me increver como:</label>

            <div className="roles">
              <div
                className={`button-group ${
                  currentTheme === "volunteer" ? "selected" : ""
                }`}
              >
                <button
                  onClick={() => setCurrentTheme("volunteer")}
                  className="role-button"
                >
                  <VolunteerImg />
                </button>
                <label className="role-name">Voluntário</label>
              </div>

              <div
                onClick={() => setCurrentTheme("org")}
                className={`button-group ${
                  currentTheme === "org" ? "selected" : ""
                }`}
              >
                <button className="role-button">
                  <OrgImg />
                </button>
                <label className="role-name">Organização</label>
              </div>
            </div>
          </div>

          <div className={`step two ${isTab(1) ? "show" : ""}`}>
            <div className="form">
              {/* ========= VOLUNTEER - STEP TWO ============= */}
              {currentTheme === "volunteer" && (
                <>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Nome Completo"
                  />
                  <input
                    name="username"
                    type="text"
                    className="input"
                    placeholder="Usuário"
                  />
                  <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="E-mail"
                  />
                  <input
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Nova Senha"
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="Confirmar Senha"
                  />
                </>
              )}
              {/* ========= ORG - STEP TWO ============= */}
              {currentTheme === "org" && (
                <>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Nome Fantasia"
                  />
                  <input
                    name="username"
                    type="text"
                    className="input"
                    placeholder="Usuário da Empresa"
                  />
                  <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="E-mail"
                  />
                  <input
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Nova Senha"
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="Confirmar Senha"
                  />
                </>
              )}
            </div>
          </div>

          <div className={`step three ${isTab(2) ? "show" : ""}`}>
            <div className="form">
              {/* ======= STEP THREE - VOLUNTEER ======= */}
              {currentTheme === "volunteer" && (
                <>
                  <input
                    name="country"
                    type="text"
                    className="input"
                    placeholder="País"
                  />
                  <input
                    name="state"
                    type="text"
                    className="input"
                    placeholder="Estado"
                  />
                  <input
                    name="city"
                    type="text"
                    className="input"
                    placeholder="Cidade"
                  />
                  <input
                    name="district"
                    type="text"
                    className="input"
                    placeholder="Bairro"
                  />

                  <div className="inline">
                    <input
                      name="houseNumber"
                      type="text"
                      className="input s"
                      placeholder="Nº"
                    />
                    <input
                      name="cep"
                      type="text"
                      className="input l"
                      placeholder="CEP"
                    />
                  </div>

                  <div className="inline">
                    <input
                      name="phone"
                      type="text"
                      className="input s"
                      placeholder="Telefone"
                    />
                    <input
                      name="whatsapp"
                      type="text"
                      className="input s"
                      placeholder="WhatsApp"
                    />
                  </div>

                  <input
                    name="birthDate"
                    type="date"
                    className="input"
                    placeholder="Data de Nascimento"
                  />

                  <div className="inline">
                    <input
                      name="CPF"
                      type="text"
                      className="input"
                      placeholder="CPF"
                    />
                    <input
                      name="RG"
                      type="text"
                      className="input"
                      placeholder="RG"
                    />
                  </div>
                </>
              )}
              {/* ======= STEP THREE - ORGANIZATION ======= */}
              {currentTheme === "org" && (
                <>
                  <input
                    name="cnpj"
                    type="text"
                    className="input"
                    placeholder="CNPJ"
                  />
                  <input
                    name="country"
                    type="text"
                    className="input"
                    placeholder="País"
                  />
                  <input
                    name="state"
                    type="text"
                    className="input"
                    placeholder="Estado"
                  />
                  <input
                    name="city"
                    type="text"
                    className="input"
                    placeholder="Cidade"
                  />
                  <input
                    name="district"
                    type="text"
                    className="input"
                    placeholder="Bairro"
                  />

                  <div className="inline">
                    <input
                      name="houseNumber"
                      type="text"
                      className="input s"
                      placeholder="Nº"
                    />
                    <input
                      name="cep"
                      type="text"
                      className="input l"
                      placeholder="CEP"
                    />
                  </div>

                  <input
                    name="phone"
                    type="text"
                    className="input"
                    placeholder="Telefone"
                  />
                  <input
                    name="whatsapp"
                    type="text"
                    className="input"
                    placeholder="WhatsApp"
                  />
                </>
              )}
            </div>
          </div>
        </form>

        <div className="actions">
          {(isTab(1) || isTab(2)) && (
            <button
              onClick={backStep}
              className="button font-label themed-outline"
            >
              VOLTAR
            </button>
          )}
          {isTab(2) ? (
            <button onClick={handleSubmit} className="button font-label themed">
              ENVIAR
            </button>
          ) : (
            <button onClick={nextStep} className="button font-label themed">
              AVANÇAR
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
