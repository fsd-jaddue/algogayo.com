import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { categories, categoryOrder, isCategorySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategorySlug(slug)) return {};
  const category = categories[slug];
  return {
    title: `${category.name} 가이드`,
    description: category.description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { title: `${category.name} 가이드 | 알고가요`, description: category.description, url: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();
  const category = categories[slug];
  const posts = getPostsByCategory(slug);
  const others = categoryOrder.filter((item) => item !== slug).map((item) => categories[item]);
  const crumbs = [
    { name: "홈", href: "/" },
    { name: category.name, href: `/category/${slug}` },
  ];

  return (
    <div className="shell listing">
      <Breadcrumb items={crumbs} />
      <PageHead kicker={`카테고리 · ${posts.length}편`} title={category.name} lead={<p>{category.intro}</p>} />
      <div className="card-grid">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} priority={index < 3} />
        ))}
      </div>
      <nav className="other-categories" aria-label="다른 카테고리">
        <strong>다른 카테고리</strong>
        <ul>
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/category/${item.slug}`}>
                <span className="other-categories__name">{item.name}</span>
                <span className="other-categories__description">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
