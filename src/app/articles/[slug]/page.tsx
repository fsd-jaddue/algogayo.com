import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { ArticleCard } from "@/components/article-card";
import { ArticleToc, ArticleTocMobile } from "@/components/article-toc";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PostNav } from "@/components/post-nav";
import { formatDate, toIsoDateTime } from "@/lib/legal";
import { getAdjacentPosts, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** 대표 이미지와 카테고리 폴백 이미지는 모두 `pnpm images`가 만드는 1600×900 JPG다. */
const IMAGE_SIZE = { width: 1600, height: 900 };

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const image = { url: post.image, alt: post.imageAlt, ...IMAGE_SIZE };
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author.name, url: absoluteUrl(siteConfig.author.url) }],
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/articles/${post.slug}`,
      images: [image],
      publishedTime: toIsoDateTime(post.publishedAt),
      modifiedTime: toIsoDateTime(post.updatedAt ?? post.publishedAt),
      authors: [siteConfig.author.name],
      section: post.categoryLabel,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post, 3);
  // 글 제목은 바로 아래 h1으로 보이므로 빵부스러기에는 넣지 않는다. JSON-LD도 보이는 항목과 같게 유지한다.
  const crumbs = [
    { name: "홈", href: "/" },
    { name: post.categoryLabel, href: `/category/${post.category}` },
  ];

  return (
    <article className="article">
      <header className="article__head shell shell--narrow">
        <Breadcrumb items={crumbs} />
        <p className="kicker">
          {post.categoryLabel}
          {post.draft && " · 초안"}
        </p>
        <h1 className="article__title">{post.title}</h1>
        <p className="article__lead">{post.description}</p>
        <dl className="article__meta">
          <div>
            <dt>작성</dt>
            <dd>{siteConfig.author.name}</dd>
          </div>
          <div>
            <dt>게시</dt>
            <dd>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </dd>
          </div>
          {post.updatedAt && (
            <div>
              <dt>수정</dt>
              <dd>
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </dd>
            </div>
          )}
          <div>
            <dt>읽기</dt>
            <dd>{post.readingTime}</dd>
          </div>
        </dl>
      </header>

      <figure className="article__cover shell">
        <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 1160px) 100vw, 1120px" priority />
      </figure>

      <div className="article__layout shell">
        <aside className="article__aside">
          <ArticleToc items={post.body.toc} />
        </aside>

        <div className="article__main">
          <ArticleTocMobile items={post.body.toc} />

          {post.summary.length > 0 && (
            <section className="summary" aria-labelledby="summary-title">
              <p className="kicker">핵심 요약</p>
              <h2 id="summary-title">이것만 기억하세요</h2>
              {post.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          )}

          <ArticleBody body={post.body} />

          {post.checklist.length > 0 && (
            <section className="checklist" aria-labelledby="checklist-title">
              <p className="kicker">마치기 전에</p>
              <h2 id="checklist-title">체크리스트</h2>
              <ul>
                {post.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {post.closing && (
            <section className="closing" aria-labelledby="closing-title">
              <h2 id="closing-title">오늘은 여기까지 해보세요</h2>
              <p>{post.closing}</p>
            </section>
          )}

          <AuthorBox />
          <PostNav previous={previous} next={next} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="related shell" aria-labelledby="related-title">
          <div className="rail__head">
            <div>
              <p className="kicker">이어서 읽기</p>
              <h2 id="related-title">함께 보면 좋은 글</h2>
            </div>
          </div>
          <div className="card-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} post={item} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}

      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </article>
  );
}
