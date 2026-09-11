import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content-types";
import { formatDate } from "@/lib/format";

type Props = {
  post: Post;
  /** 첫 화면에 보이는 카드는 지연 로딩 없이 바로 불러온다 */
  eager?: boolean;
};

export function ArticleCard({ post, eager = false }: Props) {
  return (
    <article className="article-card">
      <Link className="card-image" href={`/articles/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
        />
      </Link>
      <div className="card-body">
        <div className="eyebrow-row">
          <Link href={`/category/${post.category}`}>{post.categoryLabel}</Link>
          <span>{post.readingTime} 읽기</span>
        </div>
        <h2><Link href={`/articles/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.description}</p>
        <div className="card-footer">
          <time dateTime={post.updatedAt ?? post.publishedAt}>
            {formatDate(post.updatedAt ?? post.publishedAt)}{post.updatedAt ? " 업데이트" : ""}
          </time>
          <Link className="text-link" href={`/articles/${post.slug}`} aria-label={`${post.title} 읽기`}>
            글 읽기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
