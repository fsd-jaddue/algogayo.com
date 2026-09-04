import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { categoryInfo, posts, type CategorySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

function isCategory(slug: string): slug is CategorySlug {
  return slug in categoryInfo;
}

export function generateStaticParams() {
  return Object.keys(categoryInfo).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  const category = categoryInfo[slug];
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `${category.name} 가이드 | 알고가요`,
      description: category.description,
      url: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();
  const category = categoryInfo[slug];
  const filteredPosts = posts.filter((post) => post.category === slug);

  return (
    <div className="shell listing-page">
      <div className="breadcrumb" aria-label="현재 위치">
        <Link href="/">홈</Link><span aria-hidden="true">/</span><span>{category.name}</span>
      </div>
      <header className="page-intro compact">
        <p className="kicker">CATEGORY</p>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>
      <div className="card-grid">
        {filteredPosts.map((post, index) => <ArticleCard key={post.slug} post={post} priority={index < 2} />)}
      </div>
    </div>
  );
}

