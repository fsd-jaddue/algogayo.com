import { toIsoDateTime } from "./legal";
import type { Post } from "./posts";
import { absoluteUrl, siteConfig } from "./site";

const publisher = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/icons/icon-512.png"), width: 512, height: 512 },
};

const author = {
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.role,
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
    datePublished: toIsoDateTime(post.publishedAt),
    dateModified: toIsoDateTime(post.updatedAt ?? post.publishedAt),
    inLanguage: "ko-KR",
    articleSection: post.categoryLabel,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/articles/${post.slug}`) },
    author,
    publisher,
  };
}

/** 화면에 보이는 빵부스러기와 같은 항목만 넘겨야 한다(구조화 데이터는 보이는 내용과 일치해야 함). */
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
