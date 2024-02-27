import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import { useForm } from "../../hooks/useForm";
import { useNotification } from "../../hooks/useNotification";
import AuthService from "../../services/AuthService";
import Login from "../../use_cases/LoginUC";
import "./styles.css";

import QRCodeImg from "../../assets/qrcode.svg?react";

const loginUser = new Login(new AuthService());

export const LoginPage: React.FC = () => {
  const { formRef, handleSubmit } = useForm(onSubmit);
  const navigation = useNavigate();
  const { pushNotification } = useNotification();

  async function onSubmit(data: { username: string; password: string }) {
    const isAuthenticated = await loginUser.execute(
      data.username,
      data.password
    );

    if (isAuthenticated) {
      sessionStorage.setItem("login_token", isAuthenticated.access_token)

      if (isAuthenticated.role == "organization") {
        localStorage.setItem("id_org", isAuthenticated.id)
        return navigation("/homepage/org");
      } else if (isAuthenticated.role == "volunteer") {
        localStorage.setItem("id_vol", isAuthenticated.id)
        return navigation("/homepage/volunteer");
      }
      
    }

    pushNotification(
      {
        message: "Usuário ou senha incorretos",
        type: "error",
      },
      true
    );
  }

  return (
    <div className="login-page">
      <button onClick={() => navigation("/validation")} className="validate">
        <QRCodeImg />
        <label className="font-label">Validar Certificado</label>
      </button>
      <img src={LogoImg} alt="HelpNet" className="logo" />
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <main className="main">
          <input
            name="username"
            type="text"
            className="input"
            placeholder="Usuário"
          />
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Senha"
          />
        </main>

        <div className="actions">
          <button className="button font-text primary">ENTRAR</button>
          <label className="register font-text">
            Ainda não possui conta?
            <Link to="/register" className="font-link">
              Cadastre-se
            </Link>
          </label>
        </div>
      </form>
    </div>
  );
};
