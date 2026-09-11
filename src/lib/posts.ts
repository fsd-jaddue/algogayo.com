import { entries } from "@/content";
import type { CategorySlug, Post, PostContent, PostEntry } from "@/lib/content-types";
import { computeReadingTime, countCharacters } from "@/lib/reading-time";

export type { CategorySlug, Post, PostContent } from "@/lib/content-types";

export type CategoryInfo = {
  name: string;
  /** 카드·메타 설명용 한 줄 */
  description: string;
  /** 카테고리 페이지 상단 소개문 */
  longDescription: string;
};

export const categoryInfo: Record<CategorySlug, CategoryInfo> = {
  living: {
    name: "생활비",
    description: "무리한 절약보다 오래 유지할 수 있는 지출 관리 방법을 다룹니다.",
    longDescription:
      "생활비 카테고리는 매달 반복되는 지출을 다룹니다. 통신비·구독·보험처럼 자동으로 빠져나가는 고정비, 장보기와 식비처럼 습관에 따라 크게 달라지는 변동비, 전기·가스 요금처럼 고지서를 읽을 줄 알아야 줄일 수 있는 공과금이 주요 주제입니다. 무리한 절약법 대신 한 달에 한 번 점검해도 유지되는 순서와 기준, 그리고 직접 계산해 볼 수 있는 예시를 함께 제공합니다. 요금과 제도는 바뀌기 때문에 글마다 공식 출처와 확인 날짜를 밝힙니다.",
  },
  digital: {
    name: "디지털",
    description: "기기와 파일, 알림을 단순하게 정리해 시간을 되찾는 방법을 다룹니다.",
    longDescription:
      "디지털 카테고리는 스마트폰, 클라우드, 계정처럼 매일 쓰지만 정리는 미루기 쉬운 것들을 다룹니다. 알림과 저장 공간을 정돈해 집중력을 되찾는 법, 사진과 문서를 잃지 않는 백업 습관, 비밀번호·2단계 인증·스미싱 대응처럼 사고를 막는 보안 기본기가 주요 주제입니다. 특정 기기나 앱을 홍보하지 않고, iOS와 Android, 주요 서비스에서 공통으로 쓸 수 있는 설정 경로와 판단 기준을 순서대로 설명합니다.",
  },
  travel: {
    name: "여행",
    description: "준비는 가볍게, 현지에서는 덜 헤매는 실용적인 여행 습관을 다룹니다.",
    longDescription:
      "여행 카테고리는 떠나기 전 준비를 가볍게 만드는 방법을 다룹니다. 짐 싸기와 예산 세우기, 기차·숙소 예약과 취소 규정 확인, 비 예보나 아이 동반처럼 변수가 있는 일정을 계획하는 법이 주요 주제입니다. 관광지 추천보다 어디를 가든 반복해서 쓸 수 있는 체크리스트와 판단 기준에 집중하며, 요금과 규정은 운영 기관의 공식 안내를 기준으로 확인 날짜와 함께 적습니다.",
  },
};

export const categorySlugs = Object.keys(categoryInfo) as CategorySlug[];

export function isCategorySlug(value: string): value is CategorySlug {
  return value in categoryInfo;
}

function assertUniqueSlugs(list: PostEntry[]) {
  const seen = new Set<string>();
  for (const { meta } of list) {
    if (seen.has(meta.slug)) throw new Error(`중복된 글 slug: ${meta.slug}`);
    seen.add(meta.slug);
  }
}

function toPost(entry: PostEntry): Post {
  return {
    ...entry.meta,
    categoryLabel: categoryInfo[entry.meta.category].name,
    readingTime: computeReadingTime(entry.content),
    wordCount: countCharacters(entry.content),
  };
}

const byNewest = (a: Post, b: Post) => b.publishedAt.localeCompare(a.publishedAt);

assertUniqueSlugs(entries);

/** 모든 발행 글, 최신순 */
export const posts: Post[] = entries.map(toPost).sort(byNewest);

export const postContent: Record<string, PostContent> = Object.fromEntries(
  entries.map((entry) => [entry.meta.slug, entry.content]),
);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostContent(slug: string): PostContent | undefined {
  return postContent[slug];
}

export function getLatestPosts(limit: number, excludeSlugs: string[] = []): Post[] {
  return posts.filter((post) => !excludeSlugs.includes(post.slug)).slice(0, limit);
}

export function getPostsByCategory(slug: CategorySlug, limit?: number): Post[] {
  const list = posts.filter((post) => post.category === slug);
  return limit ? list.slice(0, limit) : list;
}

/**
 * 함께 보면 좋은 글. 글에서 직접 지정한 related → 같은 카테고리 최신순 → 다른 카테고리 최신순.
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const picked: Post[] = [];
  const add = (candidate: Post | undefined) => {
    if (!candidate || candidate.slug === post.slug) return;
    if (picked.some((item) => item.slug === candidate.slug)) return;
    if (picked.length < limit) picked.push(candidate);
  };
  for (const slug of post.related ?? []) add(getPostBySlug(slug));
  for (const candidate of getPostsByCategory(post.category)) add(candidate);
  for (const candidate of posts) add(candidate);
  return picked;
}

const lastTouched = (post: Post) => post.updatedAt ?? post.publishedAt;

/** 사이트 전체에서 가장 최근에 발행·수정된 날짜 */
export function getLatestUpdateDate(): string {
  return posts.map(lastTouched).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
}

export function getCategoryLatestDate(slug: CategorySlug): string {
  return getPostsByCategory(slug).map(lastTouched).sort().at(-1) ?? getLatestUpdateDate();
}
