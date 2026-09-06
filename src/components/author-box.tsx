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
        <p>직접 확인한 순서와 기준만 적고, 조건에 따라 달라지는 부분은 그대로 밝힙니다.</p>
        <Link className="text-link" href={author.url}>
          운영자와 편집 원칙 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
