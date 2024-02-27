import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useNotification } from "../../hooks/useNotification";
import "./styles.css";

export const ValidateCertificatePage: React.FC = () => {
  const { formRef, handleSubmit } = useForm(onSubmit);
  const navigate = useNavigate();
  const { pushNotification } = useNotification();

  async function onSubmit(data: { code: string }) {
    // TODO: create a service to validate a code of a certificate
    const isValid = true;
    // ====================================

    if (isValid)
      return pushNotification(
        {
          message: "Código informado é de um certificado válido.",
          type: "success",
        },
        true
      );
    pushNotification(
      {
        message:
          "Código informado é de um certificado inválido ou que não existe.",
        type: "error",
      },
      true
    );
  }

  return (
    <div className="validate-certificate-page">
      <main className="main">
        <button onClick={() => navigate("/")} className="go-back">
          <ArrowIcon size={32} />
        </button>
        <h1 className="font-title">
          Digite o código de verificação do certificado
        </h1>
        <form ref={formRef} onSubmit={handleSubmit} className="form">
          <main className="main">
            <input
              name="code"
              type="text"
              className="input"
              placeholder="Código"
            />
          </main>

          <div className="actions">
            <button className="button font-label primary">
              VERIFICAR CÓDIGO
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
