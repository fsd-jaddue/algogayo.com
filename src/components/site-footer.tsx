import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-brand" href="/">알고가요</Link>
          <p>복잡한 생활 정보를 직접 실행할 수 있는 작은 단계로 정리합니다.</p>
        </div>
        <div>
          <strong>둘러보기</strong>
          <Link href="/articles">전체 글</Link>
          <Link href="/about">사이트 소개</Link>
          <Link href="/contact">문의하기</Link>
        </div>
        <div>
          <strong>안내</strong>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>읽고 바로 써먹는 생활 가이드</span>
      </div>
    </footer>
  );
}

