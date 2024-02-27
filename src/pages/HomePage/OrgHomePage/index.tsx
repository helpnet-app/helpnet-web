import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { SidebarItem } from "../../../components/Sidebar/item";
import { useTabs } from "../../../hooks/useTabs";
import "./styles.css";
import { CreateProgram } from "./tabs/CreateProgram";
import { ProgramList } from "./tabs/ProgramList";

export const OrgHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { skipTo, isTab } = useTabs(0);

  function handleLogout() {
    localStorage.removeItem("id_org")
    sessionStorage.removeItem("login_token")
    navigate("/");
  }

  return (
    <div className="homepage-org theme org">
      <Sidebar>
        <SidebarItem selected={isTab(0)} onClick={() => skipTo(0)}>
          Menu Principal
        </SidebarItem>
        {/* <SidebarItem selected={isTab(1)} onClick={() => skipTo(1)}>
          Meu Perfil
        </SidebarItem> */}
        <SidebarItem selected={isTab(2)} onClick={() => skipTo(2)}>
          Criar Novo Programa
        </SidebarItem>
        <SidebarItem onClick={handleLogout}>Sair</SidebarItem>
      </Sidebar>

      {/* =================== TABS =================== */}
      <main className="main">
        {isTab(0) && <ProgramList />}
        {isTab(2) && <CreateProgram />}
      </main>
    </div>
  );
};
