import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function AuthorBox() {
  const { author } = siteConfig;
  return (
    <aside className="author-box" aria-label="작성자">
      <div className="author-box__mark" aria-hidden="true">
        {author.name.slice(0, 1)}
      </div>
      <div className="author-box__body">
        <p className="author-box__name">
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </p>
        <p>공식 자료의 확인 경로와 생활 속 적용 예시를 함께 정리합니다. 계산 예시와 체험 기록을 구분하고, 달라질 수 있는 조건을 밝힙니다.</p>
        <Link className="text-link" href={author.url}>
          운영자와 편집 원칙 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
