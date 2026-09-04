import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function ArticleCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="article-card">
      <Link className="card-image" href={`/articles/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} />
      </Link>
      <div className="card-body">
        <div className="eyebrow-row">
          <Link href={`/category/${post.category}`}>{post.categoryLabel}</Link>
          <span>{post.readingTime} 읽기</span>
        </div>
        <h2><Link href={`/articles/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.description}</p>
        <Link className="text-link" href={`/articles/${post.slug}`} aria-label={`${post.title} 읽기`}>
          글 읽기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
