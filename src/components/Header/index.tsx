import { useEffect, useState } from "react";
import "./styles.css";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  const [datetime, setDatetime] = useState(getCurrentDate());
  const [interval, setInternal] = useState<number>();

  useEffect(() => {
    if (!interval) {
      const newInterval = setInterval(() => {
        setDatetime(getCurrentDate());
      }, 1 * 1000); // seconds * 1000
      setInternal(newInterval);
    }
  }, [interval]);

  function getCurrentDate() {
    const now = new Date();
    const date = Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(now);
    return date;
  }

  return (
    <header className="header">
      <h1 className="font-title">{title}</h1>
      <label className="font-text">{datetime}</label>
    </header>
  );
};
