import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/legal";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  /** 홈처럼 섹션 제목이 h2인 곳에서는 h3를 쓴다. */
  headingLevel?: "h2" | "h3";
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
};

const sizesByVariant = {
  featured: "(max-width: 900px) 100vw, 60vw",
  default: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
  compact: "(max-width: 900px) 40vw, 20vw",
} as const;

export function ArticleCard({ post, headingLevel = "h2", variant = "default", priority = false }: Props) {
  const Heading = headingLevel;
  const href = `/articles/${post.slug}`;

  return (
    <article className={`card card--${variant}`}>
      <Link className="card__media" href={href} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" fill sizes={sizesByVariant[variant]} priority={priority} />
      </Link>
      <div className="card__body">
        <div className="card__meta">
          <Link className="card__category" href={`/category/${post.category}`}>
            {post.categoryLabel}
          </Link>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{post.readingTime} 읽기</span>
        </div>
        <Heading className="card__title">
          <Link href={href}>{post.title}</Link>
        </Heading>
        {variant !== "compact" && <p className="card__excerpt">{post.description}</p>}
      </div>
    </article>
  );
}
