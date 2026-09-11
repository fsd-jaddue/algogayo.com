export const siteConfig = {
  name: "알고가요",
  description:
    "생활비, 디지털 습관, 가벼운 여행을 더 단순하게 만드는 실용 가이드",
  url: "https://algogayo.com",
  email: "contact@algogayo.com",
} as const;

/** 운영자(필명). 소개·푸터·글 하단에 동일하게 표기한다. */
export const siteAuthor = {
  name: "알고가요 편집장",
  role: "운영자 · 편집",
  email: siteConfig.email,
  url: `${siteConfig.url}/about`,
  id: `${siteConfig.url}/about#author`,
  since: "2026-07",
  bio: "생활비·디지털·여행 정보를 직접 실행해 보고 공식 자료와 대조한 뒤, 오늘 바로 따라 할 수 있는 순서로 정리합니다.",
} as const;

/** 개인정보처리방침·이용약관·면책조항의 공통 시행일 */
export const legalEffectiveDate = "2026-09-11";
export const legalPreviousDate = "2026-09-05";

export const navigation = [
  { href: "/articles", label: "전체 글" },
  { href: "/category/living", label: "생활비" },
  { href: "/category/digital", label: "디지털" },
  { href: "/category/travel", label: "여행" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
] as const;
