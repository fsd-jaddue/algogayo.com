import Link from "next/link";
import { categoryInfo, categorySlugs } from "@/lib/posts";
import { siteAuthor, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-brand" href="/">알고가요</Link>
          <p>복잡한 생활 정보를 직접 실행할 수 있는 작은 단계로 정리합니다.</p>
          <p className="footer-meta">
            운영·편집: {siteAuthor.name} · <a href={`mailto:${siteAuthor.email}`}>{siteAuthor.email}</a>
          </p>
        </div>
        <div>
          <strong>카테고리</strong>
          {categorySlugs.map((slug) => (
            <Link key={slug} href={`/category/${slug}`}>{categoryInfo[slug].name}</Link>
          ))}
          <Link href="/articles">전체 글</Link>
        </div>
        <div>
          <strong>둘러보기</strong>
          <Link href="/about">사이트 소개</Link>
          <Link href="/about#author">운영자 소개</Link>
          <Link href="/contact">문의하기</Link>
          <a href="/feed.xml">RSS 피드</a>
        </div>
        <div>
          <strong>안내</strong>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/disclaimer">면책조항</Link>
          <a href="/sitemap.xml">사이트맵</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>본 사이트는 Google AdSense 광고를 게재합니다. 광고는 편집 내용에 영향을 주지 않습니다.</span>
      </div>
    </footer>
  );
}
