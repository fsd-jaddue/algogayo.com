export type CategorySlug = "living" | "digital" | "travel";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  intro: string;
  fallbackImage: string;
  fallbackImageAlt: string;
};

export const categories: Record<CategorySlug, Category> = {
  living: {
    slug: "living",
    name: "생활비",
    description: "무리한 절약보다 오래 유지할 수 있는 지출 관리 방법을 다룹니다.",
    intro:
      "고정비, 장보기, 식비, 배달처럼 매달 반복되는 지출을 어디서부터 어떻게 점검할지 순서대로 정리합니다. 특정 상품이나 금융 서비스를 추천하지 않고, 각자의 조건에 맞춰 판단할 수 있는 기준을 적습니다.",
    fallbackImage: "/images/household-budget.png",
    fallbackImageAlt: "식비 계획표와 계산기, 채소가 놓인 밝은 식탁",
  },
  digital: {
    slug: "digital",
    name: "디지털",
    description: "기기와 파일, 알림을 단순하게 정리해 시간을 되찾는 방법을 다룹니다.",
    intro:
      "휴대폰 저장 공간, 알림, 사진, 비밀번호, 쓰지 않는 계정처럼 쌓이기 쉬운 디지털 생활을 정리하는 순서를 다룹니다. 기기와 앱 버전에 따라 메뉴 이름이 다를 수 있어 원리와 확인할 지점을 중심으로 설명합니다.",
    fallbackImage: "/images/digital-organizing.png",
    fallbackImageAlt: "스마트폰과 정돈된 파일 폴더, 타이머가 놓인 책상",
  },
  travel: {
    slug: "travel",
    name: "여행",
    description: "준비는 가볍게, 현지에서는 덜 헤매는 실용적인 여행 습관을 다룹니다.",
    intro:
      "짐 싸기, 숙소 예약, 이동 계획, 날씨 변수처럼 여행 전에 미리 알고 가면 편한 것들을 정리합니다. 관광지 추천보다 준비 순서와 확인할 조건에 집중합니다.",
    fallbackImage: "/images/weekend-travel.png",
    fallbackImageAlt: "주말 여행 준비물이 가지런히 담긴 여행 가방",
  },
};

export const categoryOrder: CategorySlug[] = ["living", "digital", "travel"];

export function isCategorySlug(value: string): value is CategorySlug {
  return value in categories;
}
