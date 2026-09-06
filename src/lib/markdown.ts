import type { Element, Root, RootContent } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { SKIP, visit } from "unist-util-visit";

export type TocItem = { id: string; text: string };
export type Section = { id: string; heading: string; html: string };
export type RenderedMarkdown = {
  /** 첫 번째 h2 앞에 오는 내용 (없으면 빈 문자열) */
  intro: string;
  sections: Section[];
  toc: TocItem[];
  /** 공백을 제외한 본문 글자 수 */
  charCount: number;
};

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkRehype);
const stringifier = unified().use(rehypeStringify);

function isH2(node: RootContent): node is Element {
  return node.type === "element" && node.tagName === "h2";
}

/** 외부 링크는 새 창, 표는 가로 스크롤 래퍼로 감싼다. */
function decorate(root: Root) {
  visit(root, "element", (node: Element, index, parent) => {
    if (node.tagName === "a") {
      const href = String(node.properties?.href ?? "");
      if (/^https?:\/\//.test(href)) {
        node.properties = { ...node.properties, target: "_blank", rel: ["noopener", "noreferrer"] };
      }
    }
    if (node.tagName === "table" && parent && typeof index === "number") {
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrap"] },
        children: [node],
      };
      parent.children[index] = wrapper;
      return SKIP;
    }
    return undefined;
  });
}

function stringify(nodes: RootContent[]) {
  const root: Root = { type: "root", children: nodes };
  return stringifier.stringify(root).trim();
}

/**
 * 마크다운을 h2 기준 섹션으로 나눠 렌더링한다.
 * h2에는 section-1, section-2 … 순서의 id를 붙여 목차 앵커로 쓴다.
 */
export function renderMarkdown(markdown: string): RenderedMarkdown {
  const mdast = parser.parse(markdown);
  const root = parser.runSync(mdast) as Root;
  decorate(root);

  const charCount = hastToString(root).replace(/\s+/g, "").length;
  const introNodes: RootContent[] = [];
  const sections: Section[] = [];
  const toc: TocItem[] = [];
  let current: { id: string; heading: string; nodes: RootContent[] } | null = null;

  const flush = () => {
    if (!current) return;
    sections.push({ id: current.id, heading: current.heading, html: stringify(current.nodes) });
    current = null;
  };

  for (const node of root.children) {
    if (isH2(node)) {
      flush();
      const id = `section-${sections.length + 1}`;
      const heading = hastToString(node).trim();
      node.properties = { ...node.properties, id };
      current = { id, heading, nodes: [node] };
      toc.push({ id, text: heading });
    } else if (current) {
      current.nodes.push(node);
    } else {
      introNodes.push(node);
    }
  }
  flush();

  return { intro: stringify(introNodes), sections, toc, charCount };
}
