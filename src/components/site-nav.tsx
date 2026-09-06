"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = { readonly href: string; readonly label: string };

export function SiteNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  // 열린 상태를 "어느 경로에서 열었는지"로 기억하면 페이지 이동 시 자동으로 닫힌다.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenPath(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = (className: string) =>
    items.map((item) => (
      <li key={item.href}>
        <Link className={className} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    ));

  return (
    <>
      <nav className="site-nav" aria-label="주요 메뉴">
        <ul className="site-nav__list">{links("site-nav__link")}</ul>
      </nav>
      <button
        ref={toggleRef}
        type="button"
        className="site-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <span className="site-nav__bars" aria-hidden="true" />
        <span className="visually-hidden">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
      </button>
      <nav id={panelId} className="site-nav__panel" aria-label="모바일 메뉴" hidden={!open}>
        <ul className="site-nav__panel-list">{links("site-nav__panel-link")}</ul>
      </nav>
    </>
  );
}
