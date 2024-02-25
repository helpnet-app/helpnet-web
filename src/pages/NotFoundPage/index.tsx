import "./styles.css";

import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/");
  }

  return (
    <div className="not-found-page">
      <main className="main">
        <img src={LogoImg} alt="HelpNet" className="logo" />
        <h1 className="font-title">
          <span className="notfound">404</span>
          Página Não existe
        </h1>
        <p className="font-text">
          Verifique se o endereço está digitado corretamente. Clique no botão
          abaixo para voltar para a página inicial.
        </p>

        <button onClick={redirectToLogin} className="button font-label primary">
          VOLTAR PARA TELA INICIAL
        </button>
      </main>
    </div>
  );
};
