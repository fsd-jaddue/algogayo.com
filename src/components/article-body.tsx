import type { RenderedMarkdown } from "@/lib/markdown";

/**
 * 마크다운을 h2 단위 섹션으로 렌더링한다.
 * 섹션 사이에 광고나 다른 요소를 끼워 넣을 수 있도록 섹션마다 별도 래퍼를 둔다.
 */
export function ArticleBody({ body }: { body: RenderedMarkdown }) {
  return (
    <div className="prose">
      {body.intro && <div className="prose__intro" dangerouslySetInnerHTML={{ __html: body.intro }} />}
      {body.sections.map((section) => (
        <div className="prose__section" key={section.id} dangerouslySetInnerHTML={{ __html: section.html }} />
      ))}
    </div>
  );
}
