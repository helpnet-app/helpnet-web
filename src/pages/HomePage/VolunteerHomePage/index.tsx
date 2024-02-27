import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { SidebarItem } from "../../../components/Sidebar/item";
import { useTabs } from "../../../hooks/useTabs";
import "./styles.css";
import { AppliedPrograms } from "./tabs/AppliedPrograms";
import { ProgramList } from "./tabs/ProgramList";

export const VolunteerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { skipTo, isTab } = useTabs(0);

  function handleLogout() {
    // TODO: create service to logout
    // ============================
    navigate("/");
  }

  return (
    <div className="homepage-volunteer theme volunteer">
      <Sidebar>
        <SidebarItem selected={isTab(0)} onClick={() => skipTo(0)}>
          Menu Principal
        </SidebarItem>
        {/* <SidebarItem selected={isTab(1)} onClick={() => skipTo(1)}>
          Meu Perfil
        </SidebarItem> */}
        <SidebarItem selected={isTab(2)} onClick={() => skipTo(2)}>
          Ver Programas Aplicados
        </SidebarItem>
        <SidebarItem onClick={handleLogout}>Sair</SidebarItem>
      </Sidebar>

      {/* =================== TABS =================== */}
      <main className="main">
        {isTab(0) && <ProgramList />}
        {isTab(2) && <AppliedPrograms />}
      </main>
    </div>
  );
};