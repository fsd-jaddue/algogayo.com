import type { FaqItem, Post, PostContent } from "@/lib/content-types";
import { siteAuthor, siteConfig } from "@/lib/site";

const CONTEXT = "https://schema.org";
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const LOGO = {
  "@type": "ImageObject",
  url: `${siteConfig.url}/logo.png`,
  width: 512,
  height: 512,
};

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

export function organizationJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: LOGO,
    email: siteConfig.email,
    description: siteConfig.description,
    founder: { "@type": "Person", "@id": siteAuthor.id, name: siteAuthor.name },
  };
}

export function personJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": siteAuthor.id,
    name: siteAuthor.name,
    url: siteAuthor.url,
    email: siteAuthor.email,
    jobTitle: siteAuthor.role,
    description: siteAuthor.bio,
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ko-KR",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function blogPostingJsonLd(post: Post, content: PostContent) {
  const url = absoluteUrl(`/articles/${post.slug}`);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ko-KR",
    articleSection: post.categoryLabel,
    keywords: post.tags?.join(", "),
    wordCount: post.wordCount,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@type": "Person", "@id": siteAuthor.id, name: siteAuthor.name, url: siteAuthor.url },
    publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: siteConfig.name, logo: LOGO },
    ...(content.faq?.length ? { hasPart: { "@id": `${url}#faq` } } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faq: FaqItem[], pageUrl: string) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pageUrl)}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  posts: Post[];
}) {
  return {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "ko-KR",
    isPartOf: { "@id": WEBSITE_ID },
    hasPart: input.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/articles/${post.slug}`),
      datePublished: post.publishedAt,
    })),
  };
}
