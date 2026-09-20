import Link from "next/link";

export type Crumb = { name: string; href: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="현재 위치">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href}>
              {last ? <span aria-current="page">{item.name}</span> : <Link href={item.href}>{item.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
