import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { categoryInfo, getPostsByCategory, type CategorySlug } from "@/lib/posts";

type Props = {
  slug: CategorySlug;
  /** 배경을 교차시켜 섹션 경계를 드러낸다 */
  alt?: boolean;
  limit?: number;
};

export function CategorySection({ slug, alt = false, limit = 3 }: Props) {
  const category = categoryInfo[slug];
  const all = getPostsByCategory(slug);
  const shown = all.slice(0, limit);

  return (
    <section className={alt ? "category-section alt" : "category-section"} aria-labelledby={`category-${slug}`}>
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="kicker">{category.name} · 글 {all.length}개</p>
            <h2 id={`category-${slug}`}>{category.name}</h2>
            <p className="section-lead">{category.description}</p>
          </div>
          <Link className="text-link" href={`/category/${slug}`}>
            {category.name} 글 전체 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="card-grid">
          {shown.map((post) => <ArticleCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  );
}
