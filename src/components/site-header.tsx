import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} 홈`}>
          <span className="brand__mark" aria-hidden="true">
            알
          </span>
          <span className="brand__name">{siteConfig.name}</span>
        </Link>
        <SiteNav items={navigation} />
      </div>
    </header>
  );
}
