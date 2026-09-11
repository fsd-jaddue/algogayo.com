import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { categoryInfo, categorySlugs, getPostsByCategory, isCategorySlug } from "@/lib/posts";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategorySlug(slug)) return {};
  const category = categoryInfo[slug];
  return pageMetadata({
    title: `${category.name} 가이드`,
    description: category.description,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();
  const category = categoryInfo[slug];
  const list = getPostsByCategory(slug);
  const others = categorySlugs.filter((item) => item !== slug);

  return (
    <div className="shell listing-page">
      <nav className="breadcrumb" aria-label="현재 위치">
        <Link href="/">홈</Link><span aria-hidden="true">/</span><span>{category.name}</span>
      </nav>
      <header className="page-intro compact">
        <p className="kicker">CATEGORY · 글 {list.length}개</p>
        <h1>{category.name}</h1>
        <p>{category.longDescription}</p>
      </header>
      <div className="card-grid">
        {list.map((post, index) => <ArticleCard key={post.slug} post={post} eager={index < 2} />)}
      </div>
      <aside className="other-categories" aria-label="다른 카테고리">
        <p className="kicker">다른 주제도 살펴보기</p>
        <div className="chip-row">
          {others.map((item) => (
            <Link key={item} className="chip-link" href={`/category/${item}`}>
              {categoryInfo[item].name} <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link className="chip-link" href="/articles">전체 글 <span aria-hidden="true">→</span></Link>
        </div>
      </aside>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "홈", href: "/" }, { name: category.name, href: `/category/${slug}` }]),
          collectionPageJsonLd({
            name: `${category.name} 가이드`,
            description: category.description,
            path: `/category/${slug}`,
            posts: list,
          }),
        ]}
      />
    </div>
  );
}
