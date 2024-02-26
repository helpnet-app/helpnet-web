import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  selected?: boolean;
  children: ReactNode | ReactNode[];
}

export const SidebarItem: React.FC<Props> = ({
  children,
  selected,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={`sidebar-item ${selected ? "selected" : ""}`}
    >
      <label className="font-text">{children}</label>
    </li>
  );
};
