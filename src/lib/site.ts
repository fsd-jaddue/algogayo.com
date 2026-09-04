export const siteConfig = {
  name: "알고가요",
  description:
    "생활비, 디지털 습관, 가벼운 여행을 더 단순하게 만드는 실용 가이드",
  url: "https://algogayo.com",
  email: "contact@algogayo.com",
} as const;

export const navigation = [
  { href: "/articles", label: "전체 글" },
  { href: "/category/living", label: "생활비" },
  { href: "/category/digital", label: "디지털" },
  { href: "/category/travel", label: "여행" },
  { href: "/about", label: "소개" },
] as const;

