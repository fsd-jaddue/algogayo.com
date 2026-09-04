import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "전체 글",
  description: "생활비, 디지털 습관, 여행 준비를 단순하게 만드는 알고가요의 모든 실용 가이드를 모았습니다.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "전체 글 | 알고가요",
    description: "오늘 바로 적용할 수 있는 생활비·디지털·여행 가이드를 만나보세요.",
    url: "/articles",
  },
};

export default function ArticlesPage() {
  return (
    <div className="shell listing-page">
      <header className="page-intro">
        <p className="kicker">ALL GUIDES</p>
        <h1>전체 글</h1>
        <p>막연한 조언 대신, 바로 시작할 수 있는 순서와 기준을 담았습니다.</p>
      </header>
      <div className="card-grid">
        {posts.map((post, index) => <ArticleCard key={post.slug} post={post} priority={index < 3} />)}
      </div>
    </div>
  );
}

