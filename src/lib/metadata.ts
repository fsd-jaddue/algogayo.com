import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const siteTitle = `${siteConfig.name} | 읽고 바로 써먹는 생활 가이드`;

/** 페이지가 openGraph를 직접 정의할 때도 기본 이미지를 잃지 않도록 함께 펼쳐 쓴다. */
export const defaultOgImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: siteTitle,
};

/** alternates 는 얕게 병합되므로 canonical 을 정의하는 모든 곳에서 함께 넣는다. */
export const rssAlternate = { "application/rss+xml": "/feed.xml" } as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
};

/** 정적 페이지용 공통 메타데이터 (canonical + OG + twitter) */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const ogImage = image
    ? { url: image.url, width: image.width ?? 1600, height: image.height ?? 900, alt: image.alt }
    : defaultOgImage;
  return {
    title,
    description,
    alternates: { canonical: path, types: rssAlternate },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage.url],
    },
  };
}
