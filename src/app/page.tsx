import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryRail } from "@/components/category-rail";
import { categories, categoryOrder } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <>
      <section className="home-intro shell" aria-labelledby="home-title">
        <h1 id="home-title">{siteConfig.tagline}</h1>
        <p>
          생활비, 디지털 습관, 여행 준비처럼 매일 마주치는 일을 미리 알고 가면 덜 헤맵니다. {siteConfig.name}는 오늘 바로
          따라 할 수 있는 순서와 확인할 기준만 골라 정리합니다.
        </p>
      </section>

      {featured && (
        <section className="home-lead shell" aria-label="최신 글">
          <div className="home-lead__main">
            <ArticleCard post={featured} variant="featured" priority />
          </div>
          {secondary.length > 0 && (
            <div className="home-lead__side">
              {secondary.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="compact" />
              ))}
              <Link className="text-link home-lead__more" href="/articles">
                전체 글 {posts.length}편 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </section>
      )}

      {categoryOrder.map((slug) => (
        <CategoryRail key={slug} category={categories[slug]} posts={getPostsByCategory(slug).slice(0, 3)} />
      ))}

      <section className="home-about shell" aria-labelledby="home-about-title">
        <div className="home-about__inner">
          <p className="kicker">알고가요는</p>
          <h2 id="home-about-title">결론을 먼저, 순서는 따라 할 수 있게, 조건은 숨기지 않게</h2>
          <p>
            막연한 조언 대신 무엇부터 확인하고 어떤 기준으로 결정할지 적습니다. 제도나 서비스 조건처럼 사람마다 결과가
            달라지는 내용은 예외와 확인할 점을 함께 밝힙니다.
          </p>
          <Link className="button button--primary" href="/about">
            운영자와 편집 원칙 보기
          </Link>
        </div>
      </section>
    </>
  );
}
