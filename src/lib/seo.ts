import { absoluteUrl, siteConfig } from "./site";
import type { Post } from "./posts";

const publisher = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
};

const author = {
  "@type": "Person",
  name: siteConfig.author.name,
  description: siteConfig.author.role,
  url: absoluteUrl(siteConfig.author.url),
};

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "algogayo.com",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ko-KR",
    publisher,
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ko-KR",
    wordCount: post.charCount,
    articleSection: post.categoryLabel,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/articles/${post.slug}`) },
    author,
    publisher,
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    ...author,
    worksFor: publisher,
  };
}
