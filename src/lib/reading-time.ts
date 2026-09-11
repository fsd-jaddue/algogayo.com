import type { PostContent } from "@/lib/content-types";

const COUNTABLE = /[가-힣A-Za-z0-9]/g;
/** 한국어 정보성 글의 평균 읽기 속도(분당 글자 수)를 보수적으로 잡은 값 */
const CHARS_PER_MINUTE = 500;

function collectText(content: PostContent): string {
  const parts: string[] = [...content.summary, content.closing];
  for (const section of content.sections) {
    parts.push(section.heading, ...section.paragraphs);
    if (section.bullets) parts.push(...section.bullets);
    if (section.steps) parts.push(...section.steps);
    if (section.note) parts.push(section.note);
    if (section.table) {
      parts.push(...section.table.columns);
      for (const row of section.table.rows) parts.push(...row);
      if (section.table.caption) parts.push(section.table.caption);
    }
    if (section.links) parts.push(...section.links.map((link) => link.label));
  }
  if (content.faq) parts.push(...content.faq.flatMap((item) => [item.question, item.answer]));
  if (content.references) parts.push(...content.references.map((ref) => ref.label));
  if (content.checklist) parts.push(...content.checklist);
  return parts.join("\n");
}

/** 한글·영문·숫자만 세어 공백과 문장부호를 제외한 글자 수 */
export function countCharacters(content: PostContent): number {
  return collectText(content).match(COUNTABLE)?.length ?? 0;
}

export function computeReadingTime(content: PostContent): string {
  const minutes = Math.max(2, Math.ceil(countCharacters(content) / CHARS_PER_MINUTE));
  return `${minutes}분`;
}
