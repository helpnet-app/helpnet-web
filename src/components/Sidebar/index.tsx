import { ReactNode, useState } from "react";
import { IoMdClose as CloseIcon, IoMdMenu as MenuIcon } from "react-icons/io";

import "./styles.css";

import FooterLogoImg from "../../assets/footer.svg?react";

interface Props {
  children: ReactNode | ReactNode[];
}

export const Sidebar: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  function toggle() {
    setExpanded(!expanded);
  }

  return (
    <aside className={`sidebar ${expanded ? "" : "short"}`}>
      <ul className="options">
        <li className="menu">
          <button onClick={toggle}>
            {expanded ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
          </button>
        </li>
        {children}
      </ul>
      <FooterLogoImg className="logo" />
    </aside>
  );
};
