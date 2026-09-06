import type { TocItem } from "@/lib/markdown";

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ol className="toc__list">
      {items.map((item, index) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>
            <span className="toc__number" aria-hidden="true">
              {index + 1}
            </span>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** 데스크톱: 왼쪽에 고정되는 목차 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="toc toc--desktop" aria-labelledby="toc-title">
      <strong id="toc-title" className="toc__title">
        이 글의 순서
      </strong>
      <TocList items={items} />
    </nav>
  );
}

/** 모바일: 접었다 펼 수 있는 목차 */
export function ArticleTocMobile({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <details className="toc toc--mobile">
      <summary>이 글의 순서</summary>
      <TocList items={items} />
    </details>
  );
}
