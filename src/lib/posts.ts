import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categories, isCategorySlug, type CategorySlug } from "./categories";
import { renderMarkdown, type RenderedMarkdown } from "./markdown";

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  categoryLabel: string;
  publishedAt: string;
  updatedAt?: string;
  draft: boolean;
  image: string;
  imageAlt: string;
  summary: string[];
  checklist: string[];
  closing?: string;
  readingTime: string;
  charCount: number;
  body: RenderedMarkdown;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const CHARS_PER_MINUTE = 500;
const MIN_BODY_CHARS = 900;
const DESCRIPTION_RANGE = [40, 160] as const;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** 개발 서버에서는 초안(draft: true)도 보여 주고, 프로덕션 빌드에서는 제외한다. */
const includeDrafts = process.env.NODE_ENV !== "production";

function fail(file: string, message: string): never {
  throw new Error(`[content/posts/${file}] ${message}`);
}

function readString(data: Record<string, unknown>, key: string, file: string, required = true) {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (required) fail(file, `frontmatter에 ${key}가 필요합니다`);
    return undefined;
  }
  if (typeof value !== "string") fail(file, `${key}는 문자열이어야 합니다`);
  return value.trim();
}

function readDate(data: Record<string, unknown>, key: string, file: string, required: boolean) {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (required) fail(file, `frontmatter에 ${key}가 필요합니다`);
    return undefined;
  }
  // YAML은 따옴표 없는 날짜를 Date로 파싱한다. 두 경우 모두 YYYY-MM-DD 문자열로 정규화한다.
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();
  if (!DATE_PATTERN.test(text) || Number.isNaN(Date.parse(text))) {
    fail(file, `${key}는 YYYY-MM-DD 형식이어야 합니다 (현재: ${String(value)})`);
  }
  return text;
}

function readStringList(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(file, `${key}는 문자열 목록이어야 합니다`);
  }
  return (value as string[]).map((item) => item.trim()).filter(Boolean);
}

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "파일 이름(slug)은 소문자 영문·숫자·하이픈만 사용할 수 있습니다");
  }

  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const title = readString(data, "title", file)!;
  const description = readString(data, "description", file)!;
  if (description.length < DESCRIPTION_RANGE[0] || description.length > DESCRIPTION_RANGE[1]) {
    fail(file, `description은 ${DESCRIPTION_RANGE[0]}~${DESCRIPTION_RANGE[1]}자여야 합니다 (현재 ${description.length}자)`);
  }

  const categorySlug = readString(data, "category", file)!;
  if (!isCategorySlug(categorySlug)) {
    fail(file, `category는 ${Object.keys(categories).join(" | ")} 중 하나여야 합니다 (현재: ${categorySlug})`);
  }
  const category = categories[categorySlug];

  const publishedAt = readDate(data, "publishedAt", file, true)!;
  const updatedAt = readDate(data, "updatedAt", file, false);
  if (updatedAt && updatedAt < publishedAt) fail(file, "updatedAt은 publishedAt보다 빠를 수 없습니다");

  const draft = data.draft === true;

  const image = readString(data, "image", file, false) ?? category.fallbackImage;
  if (!image.startsWith("/images/")) fail(file, "image는 /images/ 아래 경로여야 합니다");
  if (!fs.existsSync(path.join(PUBLIC_DIR, image))) fail(file, `이미지 파일이 없습니다: public${image}`);
  const imageAlt = readString(data, "imageAlt", file, false) ?? category.fallbackImageAlt;

  const body = renderMarkdown(content);
  if (body.sections.length === 0) fail(file, "본문에 ## 소제목이 하나 이상 필요합니다");
  if (body.charCount < MIN_BODY_CHARS) {
    fail(file, `본문이 너무 짧습니다 (${body.charCount}자, 최소 ${MIN_BODY_CHARS}자)`);
  }

  const summary = readStringList(data, "summary", file);
  const checklist = readStringList(data, "checklist", file);
  const closing = readString(data, "closing", file, false);
  // 읽기 시간과 글자 수는 요약·체크리스트·마무리까지 포함한 전체 분량으로 계산한다.
  const charCount =
    body.charCount + [...summary, ...checklist, closing ?? ""].join("").replace(/\s+/g, "").length;

  return {
    slug,
    title,
    description,
    category: categorySlug,
    categoryLabel: category.name,
    publishedAt,
    updatedAt,
    draft,
    image,
    imageAlt,
    summary,
    checklist,
    closing,
    readingTime: `${Math.max(1, Math.ceil(charCount / CHARS_PER_MINUTE))}분`,
    charCount,
    body,
  };
}

let cache: Post[] | undefined;

function loadAll(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) throw new Error("content/posts 디렉터리가 없습니다");

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"));
  const posts = files.map(loadPost);

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) fail(`${post.slug}.md`, "같은 slug의 글이 두 개 이상 있습니다");
    seen.add(post.slug);
  }

  posts.sort((a, b) => (a.publishedAt === b.publishedAt ? a.title.localeCompare(b.title, "ko") : b.publishedAt.localeCompare(a.publishedAt)));
  cache = posts;
  return posts;
}

/** 공개된 글을 최신순으로 반환한다. 개발 서버에서는 초안도 포함한다. */
export function getAllPosts(): Post[] {
  return loadAll().filter((post) => includeDrafts || !post.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

/** 이전 글(더 오래된 글)과 다음 글(더 새로운 글). */
export function getAdjacentPosts(slug: string): { previous?: Post; next?: Post } {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { previous: posts[index + 1], next: posts[index - 1] };
}

/** 같은 카테고리의 다른 글을 우선하고, 부족하면 다른 카테고리 최신 글로 채운다. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((item) => item.slug !== post.slug);
  const sameCategory = others.filter((item) => item.category === post.category);
  const rest = others.filter((item) => item.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** 글 집합의 가장 최근 수정일(YYYY-MM-DD). 비어 있으면 undefined. */
export function getLastModified(posts: Post[]): string | undefined {
  return posts.map((post) => post.updatedAt ?? post.publishedAt).sort().at(-1);
}
