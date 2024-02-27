import "./styles.css";

interface Props {
  content: string;
  type:
    | "todo"
    | "finished"
    | "inprogress"
    | "v1"
    | "v2"
    | "v3"
    | "v4"
    | "v5"
    | "outline";
}

export const Tag: React.FC<Props> = ({ content, type }) => {
  return (
    <div className={`tag ${type}`}>
      <span className="font-text">{content}</span>
    </div>
  );
};
