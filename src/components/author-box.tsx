import Link from "next/link";
import { siteAuthor } from "@/lib/site";

type Props = {
  /** 소개 페이지 자체에서는 "운영자 소개 보기" 링크를 숨긴다 */
  showProfileLink?: boolean;
  id?: string;
};

export function AuthorBox({ showProfileLink = true, id }: Props) {
  return (
    <div className="article-author" id={id}>
      <div className="author-mark" aria-hidden="true">알</div>
      <div>
        <strong>{siteAuthor.name}</strong>
        <span className="author-role">{siteAuthor.role}</span>
        <p>{siteAuthor.bio}</p>
        <div className="author-links">
          <a className="text-link" href={`mailto:${siteAuthor.email}`}>{siteAuthor.email}</a>
          {showProfileLink && (
            <Link className="text-link" href="/about#author">
              운영자 소개 보기 <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
