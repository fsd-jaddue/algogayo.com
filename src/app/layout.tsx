import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { websiteJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

// 제목에만 쓰는 세리프. 본문은 시스템 한글 폰트를 써서 로딩 비용을 줄인다.
const serif = Noto_Serif_KR({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: absoluteUrl(siteConfig.author.url) }],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  verification: {
    google: siteConfig.verification.google,
    other: siteConfig.verification.naver ? { "naver-site-verification": siteConfig.verification.naver } : undefined,
  },
  other: { "google-adsense-account": siteConfig.adsense.client },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={serif.variable}>
      <head>
        {/* 페이지별 alternates.canonical 이 metadata의 alternates 를 통째로 덮어쓰므로 RSS 링크는 직접 둔다. */}
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS`} href={absoluteUrl("/feed.xml")} />
        {/* AdSense 사이트 확인·광고 로더. React 19가 head로 호이스팅하므로 SSR HTML에 그대로 남는다. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.client}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
