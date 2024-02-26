import { ReactNode } from "react";

import "./styles.css";

import FooterLogoImg from "../../assets/footer.svg";
interface Props {
  children: ReactNode | ReactNode[];
}

export const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <aside className="sidebar">
      <ul className="options">{children}</ul>
      <img src={FooterLogoImg} alt="HelpNet© 2024" className="logo" />
    </aside>
  );
};
