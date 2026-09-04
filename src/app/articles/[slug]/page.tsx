import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { postContent } from "@/lib/post-content";
import { posts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "알고가요 편집팀", url: `${siteConfig.url}/about` }],
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/articles/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["알고가요 편집팀"],
      section: post.categoryLabel,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00+09:00`));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  const content = postContent[slug];
  if (!post || !content) notFound();

  const related = posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${siteConfig.url}/articles/${post.slug}`,
    author: { "@type": "Organization", name: "알고가요 편집팀", url: `${siteConfig.url}/about` },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <article className="article-page">
      <header className="article-header shell">
        <nav className="breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link><span aria-hidden="true">/</span>
          <Link href={`/category/${post.category}`}>{post.categoryLabel}</Link>
        </nav>
        <div className="article-heading-grid">
          <div>
            <p className="kicker">{post.categoryLabel} GUIDE</p>
            <h1>{post.title}</h1>
            <p className="article-description">{post.description}</p>
            <div className="article-meta">
              <span>알고가요 편집팀</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readingTime} 읽기</span>
            </div>
          </div>
          <div className="article-cover">
            <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" priority />
          </div>
        </div>
      </header>

      <div className="article-layout shell">
        <aside className="article-aside" aria-label="글 목차">
          <strong>이 글의 순서</strong>
          <ol>
            {content.sections.map((section) => (
              <li key={section.heading}><a href={`#${section.heading.split(".")[0]}`}>{section.heading}</a></li>
            ))}
          </ol>
        </aside>

        <div className="article-content">
          <section className="summary-box" aria-labelledby="summary-title">
            <span>한눈에 보기</span>
            <h2 id="summary-title">이것만 기억하세요</h2>
            {content.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          {content.sections.map((section) => (
            <section className="content-section" id={section.heading.split(".")[0]} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {section.note && <aside className="note"><strong>알아두세요</strong><p>{section.note}</p></aside>}
            </section>
          ))}

          <section className="checklist-box" aria-labelledby="checklist-title">
            <p className="kicker">QUICK CHECK</p>
            <h2 id="checklist-title">마치기 전 체크리스트</h2>
            <ul>{content.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="article-closing">
            <h2>오늘은 여기까지 해보세요</h2>
            <p>{content.closing}</p>
          </section>

          <div className="article-author">
            <div className="author-mark" aria-hidden="true">알</div>
            <div>
              <strong>알고가요 편집팀</strong>
              <p>공식 안내와 신뢰할 수 있는 자료를 바탕으로, 일상에서 실행하기 쉬운 순서와 기준을 정리합니다.</p>
              <Link className="text-link" href="/about">편집 원칙 보기 <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <div className="shell">
            <div className="section-heading">
              <div><p className="kicker">KEEP READING</p><h2>같은 주제의 글</h2></div>
            </div>
            <div className="related-grid">{related.map((item) => <ArticleCard key={item.slug} post={item} />)}</div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
