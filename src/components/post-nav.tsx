import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostNav({ previous, next }: { previous?: Post; next?: Post }) {
  if (!previous && !next) return null;
  return (
    <nav className="post-nav" aria-label="이전 글과 다음 글">
      {previous ? (
        <Link className="post-nav__item post-nav__item--previous" href={`/articles/${previous.slug}`} rel="prev">
          <span className="post-nav__label">이전 글</span>
          <span className="post-nav__title">{previous.title}</span>
        </Link>
      ) : (
        <span className="post-nav__item post-nav__item--empty" aria-hidden="true" />
      )}
      {next ? (
        <Link className="post-nav__item post-nav__item--next" href={`/articles/${next.slug}`} rel="next">
          <span className="post-nav__label">다음 글</span>
          <span className="post-nav__title">{next.title}</span>
        </Link>
      ) : (
        <span className="post-nav__item post-nav__item--empty" aria-hidden="true" />
      )}
    </nav>
  );
}
