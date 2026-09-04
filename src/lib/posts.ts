export type CategorySlug = "living" | "digital" | "travel";

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  categoryLabel: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  imageAlt: string;
};

export const posts: Post[] = [
  {
    slug: "weekly-meal-plan-without-waste",
    title: "장보기 전 20분, 식비와 음식물 쓰레기를 함께 줄이는 주간 식단법",
    description:
      "냉장고 확인부터 공통 재료 고르기, 장보기 목록 작성까지 매주 반복할 수 있는 현실적인 순서를 정리했습니다.",
    category: "living",
    categoryLabel: "생활비",
    publishedAt: "2026-08-28",
    readingTime: "7분",
    image: "/images/household-budget.png",
    imageAlt: "식비 계획표와 계산기, 채소가 놓인 밝은 식탁 일러스트",
  },
  {
    slug: "smartphone-notification-reset",
    title: "집중력을 되찾는 스마트폰 알림 정리: 30분 설정 가이드",
    description:
      "모든 알림을 끄는 극단적인 방법 대신, 놓치면 곤란한 알림만 남기는 기준과 순서를 알려드립니다.",
    category: "digital",
    categoryLabel: "디지털",
    publishedAt: "2026-08-24",
    readingTime: "6분",
    image: "/images/digital-organizing.png",
    imageAlt: "스마트폰과 정돈된 파일 폴더, 타이머가 놓인 책상 일러스트",
  },
  {
    slug: "weekend-trip-light-packing",
    title: "주말 1박 2일 짐 싸기: 빠뜨리지 않고 가볍게 챙기는 체크리스트",
    description:
      "가방 크기부터 옷 조합, 세면도구와 충전기까지 짐을 줄이면서도 불편하지 않은 준비법입니다.",
    category: "travel",
    categoryLabel: "여행",
    publishedAt: "2026-08-18",
    readingTime: "8분",
    image: "/images/weekend-travel.png",
    imageAlt: "주말 여행 준비물이 가지런히 담긴 여행 가방 일러스트",
  },
  {
    slug: "fixed-expense-review",
    title: "매달 빠져나가는 고정비, 1시간 안에 점검하는 순서",
    description:
      "통신비·구독·보험·주거비를 한꺼번에 줄이려다 지치지 않도록, 효과가 큰 항목부터 확인하는 방법입니다.",
    category: "living",
    categoryLabel: "생활비",
    publishedAt: "2026-08-12",
    readingTime: "7분",
    image: "/images/household-budget.png",
    imageAlt: "월 지출을 점검하는 계획표와 계산기가 놓인 식탁 일러스트",
  },
  {
    slug: "photo-backup-three-step",
    title: "휴대폰 사진이 쌓일 때: 삭제보다 먼저 할 3단계 백업",
    description:
      "원본을 잃지 않으면서 중복 사진을 줄이고, 나중에도 찾기 쉬운 폴더 구조를 만드는 방법을 설명합니다.",
    category: "digital",
    categoryLabel: "디지털",
    publishedAt: "2026-08-05",
    readingTime: "7분",
    image: "/images/digital-organizing.png",
    imageAlt: "사진 파일 폴더와 스마트폰이 정리된 작업 공간 일러스트",
  },
  {
    slug: "rainy-day-travel-plan",
    title: "비 예보가 있는 여행, 일정 전체를 바꾸지 않는 플랜 B 만들기",
    description:
      "실내 후보를 무작정 늘리지 않고 이동 동선과 예약 조건을 기준으로 대체 일정을 준비하는 법입니다.",
    category: "travel",
    categoryLabel: "여행",
    publishedAt: "2026-07-29",
    readingTime: "6분",
    image: "/images/weekend-travel.png",
    imageAlt: "지도와 여행용품을 펼쳐 둔 여행 준비 장면 일러스트",
  },
  {
    slug: "grocery-unit-price",
    title: "대용량이 늘 싼 것은 아니다: 장볼 때 단위 가격 계산하는 법",
    description:
      "묶음 할인과 대용량 상품 앞에서 실제로 이득인지 빠르게 판단하는 계산 기준을 예시와 함께 정리했습니다.",
    category: "living",
    categoryLabel: "생활비",
    publishedAt: "2026-07-21",
    readingTime: "5분",
    image: "/images/household-budget.png",
    imageAlt: "장보기 예산을 계산하는 노트와 식재료가 있는 장면 일러스트",
  },
  {
    slug: "password-manager-start",
    title: "비밀번호 관리 앱을 처음 쓸 때 꼭 정할 네 가지 원칙",
    description:
      "도구를 바꾸는 것보다 중요한 마스터 비밀번호, 복구 수단, 2단계 인증과 기기 관리의 기본을 다룹니다.",
    category: "digital",
    categoryLabel: "디지털",
    publishedAt: "2026-07-14",
    readingTime: "8분",
    image: "/images/digital-organizing.png",
    imageAlt: "스마트폰과 디지털 파일이 정돈된 책상 일러스트",
  },
];

export const categoryInfo: Record<
  CategorySlug,
  { name: string; description: string }
> = {
  living: {
    name: "생활비",
    description: "무리한 절약보다 오래 유지할 수 있는 지출 관리 방법을 다룹니다.",
  },
  digital: {
    name: "디지털",
    description: "기기와 파일, 알림을 단순하게 정리해 시간을 되찾는 방법을 다룹니다.",
  },
  travel: {
    name: "여행",
    description: "준비는 가볍게, 현지에서는 덜 헤매는 실용적인 여행 습관을 다룹니다.",
  },
};

