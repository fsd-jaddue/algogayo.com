import Link from "next/link";
import type { Category } from "@/lib/categories";
import type { Post } from "@/lib/posts";
import { ArticleCard } from "./article-card";

export function CategoryRail({ category, posts }: { category: Category; posts: Post[] }) {
  if (posts.length === 0) return null;
  const headingId = `rail-${category.slug}`;

  return (
    <section className="rail shell" aria-labelledby={headingId}>
      <div className="rail__head">
        <div>
          <p className="kicker">카테고리</p>
          <h2 id={headingId}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </h2>
          <p className="rail__description">{category.description}</p>
        </div>
        <Link className="text-link" href={`/category/${category.slug}`}>
          {category.name} 글 모두 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="card-grid">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
