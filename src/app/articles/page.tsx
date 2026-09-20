import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { categories, categoryOrder } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/seo";

const description = "생활비, 디지털 습관, 여행 준비를 단순하게 만드는 알고가요의 모든 가이드를 최신순으로 모았습니다.";

export const metadata: Metadata = {
  title: "전체 글",
  description,
  alternates: { canonical: "/articles" },
  openGraph: { title: "전체 글 | 알고가요", description, url: "/articles" },
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "전체 글", href: "/articles" },
  ];

  return (
    <div className="shell listing">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker={`${posts.length}편`}
        title="전체 글"
        lead={
          <>
            <p>막연한 조언 대신, 바로 시작할 수 있는 순서와 기준을 담았습니다. 최근에 올린 글부터 보여 드립니다.</p>
            <ul className="chip-list" aria-label="카테고리로 이동">
              {categoryOrder.map((slug) => (
                <li key={slug}>
                  <Link className="chip" href={`/category/${slug}`}>
                    {categories[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }
      />
      <div className="card-grid">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} priority={index < 3} />
        ))}
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
