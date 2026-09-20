import Link from "next/link";
import { footerNavigation, siteConfig } from "@/lib/site";

const groups = [
  { title: "둘러보기", links: footerNavigation.browse },
  { title: "사이트", links: footerNavigation.site },
  { title: "약관과 정책", links: footerNavigation.legal },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <Link className="site-footer__name" href="/">
            {siteConfig.name}
          </Link>
          <p>{siteConfig.tagline}. 생활비, 디지털 습관, 여행 준비를 바로 따라 할 수 있는 순서로 정리합니다.</p>
          <p className="site-footer__contact">
            문의: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
        {groups.map((group) => (
          <nav className="site-footer__group" key={group.title} aria-label={group.title}>
            <strong>{group.title}</strong>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. 모든 글과 이미지의 권리는 알고가요에 있습니다.</span>
        <span>이 사이트에는 Google AdSense 광고가 게재될 수 있습니다.</span>
      </div>
    </footer>
  );
}
