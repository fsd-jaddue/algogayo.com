import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { categoryInfo, categorySlugs, posts } from "@/lib/posts";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/structured-data";

const description = "생활비, 디지털 습관, 여행 준비를 단순하게 만드는 알고가요의 모든 실용 가이드를 모았습니다.";

export const metadata: Metadata = pageMetadata({ title: "전체 글", description, path: "/articles" });

export default function ArticlesPage() {
  return (
    <div className="shell listing-page">
      <header className="page-intro">
        <p className="kicker">ALL GUIDES · 글 {posts.length}개</p>
        <h1>전체 글</h1>
        <p>막연한 조언 대신, 바로 시작할 수 있는 순서와 기준을 담았습니다. 주제별로 보려면 카테고리를 선택하세요.</p>
      </header>
      <nav className="chip-row" aria-label="카테고리">
        {categorySlugs.map((slug) => (
          <Link key={slug} className="chip-link" href={`/category/${slug}`}>
            {categoryInfo[slug].name}
          </Link>
        ))}
      </nav>
      <div className="card-grid">
        {posts.map((post, index) => <ArticleCard key={post.slug} post={post} eager={index < 3} />)}
      </div>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "홈", href: "/" }, { name: "전체 글", href: "/articles" }]),
          collectionPageJsonLd({ name: "전체 글", description, path: "/articles", posts }),
        ]}
      />
    </div>
  );
}
