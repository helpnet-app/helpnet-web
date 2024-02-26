import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import { useForm } from "../../hooks/useForm";
import { useNotification } from "../../hooks/useNotification";
import "./styles.css";
import Login from "../../use_cases/LoginUC";
import AuthService from "../../services/AuthService";

const loginUser = new Login(new AuthService());

export const LoginPage: React.FC = () => {
  const { formRef, handleSubmit } = useForm(onSubmit);
  const navigation = useNavigate();
  const { pushNotification } = useNotification();

  async function onSubmit(data: { username: string; password: string }) {

    const isAuthenticated = await loginUser.execute(data.username, data.password)

    if (isAuthenticated) return navigation("/homepage/org");
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
