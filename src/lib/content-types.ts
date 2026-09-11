export type CategorySlug = "living" | "digital" | "travel";

/** 본문 안에서 다른 글이나 외부 자료로 이어지는 링크 */
export type ContentLink = {
  label: string;
  href: string;
  /** 외부 사이트 링크면 true (새 창, noopener) */
  external?: boolean;
  /** 링크 옆에 붙는 짧은 설명 (출처 기관, 확인 날짜 등) */
  note?: string;
};

export type ContentTable = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentSection = {
  /** 목차 앵커. 비우면 section-{n} 으로 생성 */
  id?: string;
  heading: string;
  paragraphs: string[];
  /** 순서가 없는 항목 */
  bullets?: string[];
  /** 순서가 있는 절차 */
  steps?: string[];
  table?: ContentTable;
  /** "알아두세요" 박스 */
  note?: string;
  /** 섹션 하단 "더 알아보기" 링크 */
  links?: ContentLink[];
};

export type PostContent = {
  summary: string[];
  sections: ContentSection[];
  faq?: FaqItem[];
  references?: ContentLink[];
  checklist?: string[];
  closing: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD, 내용을 크게 고쳤을 때 */
  updatedAt?: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  /** 함께 보면 좋은 글로 먼저 보여줄 slug */
  related?: string[];
};

export type Post = PostMeta & {
  categoryLabel: string;
  readingTime: string;
  /** 본문 글자 수 (한글·영문·숫자) */
  wordCount: number;
};

export type PostEntry = {
  meta: PostMeta;
  content: PostContent;
};
