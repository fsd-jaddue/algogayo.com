export const siteConfig = {
  name: "알고가요",
  tagline: "알고 가면 덜 헤매는 생활 가이드",
  description:
    "생활비, 디지털 습관, 여행 준비처럼 매일 마주치는 일을 미리 알고 가면 덜 헤매도록, 바로 따라 할 수 있는 순서로 정리한 한국어 실용 가이드입니다.",
  url: "https://algogayo.com",
  email: "contact@algogayo.com",
  locale: "ko_KR",
  /**
   * 운영자 정보. 필명은 소개 페이지, 글 하단 작성자 박스, JSON-LD(Person)에 함께 쓰입니다.
   * TODO: 실제 사용할 필명과 소개로 바꾸세요.
   */
  author: {
    name: "알고지기",
    role: "알고가요 운영자",
    bio: "생활비, 디지털 정리, 가벼운 여행처럼 누구나 겪는 일을 미리 알고 가면 덜 헤맨다는 생각으로 글을 씁니다. 직접 해 본 순서와 확인한 기준만 적고, 조건에 따라 달라지는 부분은 그대로 밝힙니다.",
    url: "/about",
  },
  adsense: {
    client: "ca-pub-9408914409364609",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
  },
} as const;

export const navigation = [
  { href: "/articles", label: "전체 글" },
  { href: "/category/living", label: "생활비" },
  { href: "/category/digital", label: "디지털" },
  { href: "/category/travel", label: "여행" },
  { href: "/about", label: "소개" },
] as const;

export const footerNavigation = {
  browse: [
    { href: "/articles", label: "전체 글" },
    { href: "/category/living", label: "생활비" },
    { href: "/category/digital", label: "디지털" },
    { href: "/category/travel", label: "여행" },
  ],
  site: [
    { href: "/about", label: "사이트 소개" },
    { href: "/contact", label: "문의하기" },
    { href: "/feed.xml", label: "RSS 피드" },
  ],
  legal: [
    { href: "/privacy", label: "개인정보처리방침" },
    { href: "/terms", label: "이용약관" },
  ],
} as const;

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}
