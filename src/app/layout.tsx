import type { Metadata } from "next";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultOgImage, rssAlternate, siteTitle } from "@/lib/metadata";
import { siteAuthor, siteConfig } from "@/lib/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const adsenseAccount =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT ??
  "ca-pub-9408914409364609";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteAuthor.name, url: siteAuthor.url }],
  creator: siteAuthor.name,
  publisher: siteConfig.name,
  keywords: ["생활비 절약", "고정비 점검", "디지털 정리", "스마트폰 정리", "여행 준비", "생활 가이드"],
  alternates: { types: rssAlternate },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    title: siteTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.description,
    images: [defaultOgImage.url],
  },
  verification:
    googleVerification || naverVerification
      ? {
          google: googleVerification,
          other: naverVerification ? { "naver-site-verification": naverVerification } : undefined,
        }
      : undefined,
  other: { "google-adsense-account": adsenseAccount },
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <JsonLd data={[webSiteJsonLd(), organizationJsonLd()]} />
        <Script
          id="adsense-loader"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseAccount}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
