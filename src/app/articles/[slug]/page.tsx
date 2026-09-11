import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { AuthorBox } from "@/components/author-box";
import { JsonLd } from "@/components/json-ld";
import type { ContentLink, ContentSection } from "@/lib/content-types";
import { formatDate } from "@/lib/format";
import { rssAlternate } from "@/lib/metadata";
import { getPostBySlug, getPostContent, getRelatedPosts, posts } from "@/lib/posts";
import { siteAuthor, siteConfig } from "@/lib/site";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const path = `/articles/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteAuthor.name, url: siteAuthor.url }],
    alternates: { canonical: path, types: rssAlternate },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [siteAuthor.name],
      section: post.categoryLabel,
      tags: post.tags,
      images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

const sectionId = (section: ContentSection, index: number) => section.id ?? `section-${index + 1}`;

function ContentLinkItem({ link }: { link: ContentLink }) {
  const label = (
    <>
      {link.label}
      {link.note && <small> ({link.note})</small>}
    </>
  );
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer">{label}</a>
  ) : (
    <Link href={link.href}>{label}</Link>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = getPostContent(slug);
  if (!post || !content) notFound();

  const path = `/articles/${post.slug}`;
  const related = getRelatedPosts(post, 3);
  const hasFaq = Boolean(content.faq?.length);
  const hasChecklist = Boolean(content.checklist?.length);
  const hasReferences = Boolean(content.references?.length);

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
              <span>{siteAuthor.name}</span>
              <span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> 발행</span>
              {post.updatedAt && (
                <span><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time> 업데이트</span>
              )}
              <span>{post.readingTime} 읽기</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <ul className="tag-list" aria-label="태그">
                {post.tags.map((tag) => <li key={tag}>#{tag}</li>)}
              </ul>
            )}
          </div>
          <div className="article-cover">
            <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" preload />
          </div>
        </div>
      </header>

      <div className="article-layout shell">
        <aside className="article-aside" aria-label="글 목차">
          <strong>이 글의 순서</strong>
          <ol>
            {content.sections.map((section, index) => (
              <li key={sectionId(section, index)}>
                <a href={`#${sectionId(section, index)}`}>{section.heading}</a>
              </li>
            ))}
            {hasFaq && <li><a href="#faq">자주 묻는 질문</a></li>}
            {hasChecklist && <li><a href="#checklist">마치기 전 체크리스트</a></li>}
            {hasReferences && <li><a href="#references">참고 자료</a></li>}
          </ol>
        </aside>

        <div className="article-content">
          <section className="summary-box" aria-labelledby="summary-title">
            <span>한눈에 보기</span>
            <h2 id="summary-title">이것만 기억하세요</h2>
            {content.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          {content.sections.map((section, index) => (
            <section className="content-section" id={sectionId(section, index)} key={sectionId(section, index)}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.steps && (
                <ol className="steps">{section.steps.map((item) => <li key={item}>{item}</li>)}</ol>
              )}
              {section.bullets && (
                <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {section.table && (
                <div className="table-wrap">
                  <table className="content-table">
                    {section.table.caption && <caption>{section.table.caption}</caption>}
                    <thead>
                      <tr>{section.table.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.note && <aside className="note"><strong>알아두세요</strong><p>{section.note}</p></aside>}
              {section.links && section.links.length > 0 && (
                <div className="section-links">
                  <span>더 알아보기</span>
                  {section.links.map((link) => <ContentLinkItem key={link.href} link={link} />)}
                </div>
              )}
            </section>
          ))}

          {hasFaq && (
            <section className="faq-box" id="faq" aria-labelledby="faq-title">
              <p className="kicker">FAQ</p>
              <h2 id="faq-title">자주 묻는 질문</h2>
              {content.faq!.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </section>
          )}

          {hasChecklist && (
            <section className="checklist-box" id="checklist" aria-labelledby="checklist-title">
              <p className="kicker">QUICK CHECK</p>
              <h2 id="checklist-title">마치기 전 체크리스트</h2>
              <ul>{content.checklist!.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          )}

          <section className="article-closing">
            <h2>오늘은 여기까지 해보세요</h2>
            <p>{content.closing}</p>
          </section>

          {hasReferences && (
            <section className="references-box" id="references" aria-labelledby="references-title">
              <h2 id="references-title">참고 자료</h2>
              <ul>
                {content.references!.map((ref) => (
                  <li key={ref.href}><ContentLinkItem link={{ ...ref, external: ref.external ?? true }} /></li>
                ))}
              </ul>
              <p className="references-note">글을 작성한 시점에 확인한 자료입니다. 요금과 제도는 바뀔 수 있으니 방문 시점의 최신 안내를 함께 확인하세요.</p>
            </section>
          )}

          <AuthorBox />
          <p className="article-disclaimer">
            이 글은 일반적인 정보 제공을 목적으로 하며, 개인의 상황에 따라 결과가 다를 수 있습니다. 자세한 내용은 <Link href="/disclaimer">면책조항</Link>을 확인해 주세요.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="kicker">KEEP READING</p><h2 id="related-title">함께 보면 좋은 글</h2></div>
              <Link className="text-link" href={`/category/${post.category}`}>
                {post.categoryLabel} 글 더 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="card-grid">{related.map((item) => <ArticleCard key={item.slug} post={item} />)}</div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          blogPostingJsonLd(post, content),
          breadcrumbJsonLd([
            { name: "홈", href: "/" },
            { name: post.categoryLabel, href: `/category/${post.category}` },
            { name: post.title, href: path },
          ]),
          ...(hasFaq ? [faqJsonLd(content.faq!, path)] : []),
        ]}
      />
    </article>
  );
}
