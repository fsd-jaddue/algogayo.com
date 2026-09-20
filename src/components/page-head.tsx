import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: string;
  lead?: ReactNode;
  narrow?: boolean;
};

export function PageHead({ kicker, title, lead, narrow = false }: Props) {
  return (
    <header className={`page-head${narrow ? " page-head--narrow" : ""}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="page-head__title">{title}</h1>
      {lead && <div className="page-head__lead">{lead}</div>}
    </header>
  );
}
