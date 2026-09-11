// 발행 글 품질 검사: 글자 수, slug 일치, 날짜, 이미지 존재, 참고 자료, 중복 slug
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = process.env.POSTS_DIR ?? "src/content/posts";
const MIN_CHARS = Number(process.env.MIN_CHARS ?? 2000);
const today = new Date().toISOString().slice(0, 10);

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".ts"));
const problems = [];
const seen = new Set();
const rows = [];

const field = (src, name) => src.match(new RegExp(`\\b${name}:\\s*"([^"]*)"`))?.[1];

for (const file of files) {
  const src = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const slug = field(src, "slug");
  const publishedAt = field(src, "publishedAt");
  const updatedAt = field(src, "updatedAt");
  const image = field(src, "image");
  const name = file.replace(/\.ts$/, "");

  if (!slug) problems.push(`${file}: slug 없음`);
  if (slug && slug !== name) problems.push(`${file}: 파일명과 slug(${slug}) 불일치`);
  if (slug && seen.has(slug)) problems.push(`${file}: 중복 slug ${slug}`);
  if (slug) seen.add(slug);
  if (!publishedAt || publishedAt > today) problems.push(`${file}: publishedAt(${publishedAt})가 없거나 미래 날짜`);
  if (updatedAt && updatedAt > today) problems.push(`${file}: updatedAt(${updatedAt})가 미래 날짜`);
  if (updatedAt && publishedAt && updatedAt < publishedAt) problems.push(`${file}: updatedAt이 publishedAt보다 이전`);
  if (!image || !fs.existsSync(path.join("public", image))) problems.push(`${file}: 이미지 파일 없음 (${image})`);

  // 본문 글자 수: content 블록 안의 문자열 리터럴만 센다
  const contentStart = src.indexOf("content:");
  const body = contentStart >= 0 ? src.slice(contentStart) : "";
  const strings = [...body.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  // href·id 같은 값은 제외
  const text = strings.filter((s) => !/^(https?:\/\/|\/|#|section-)/.test(s)).join("\n");
  const chars = text.match(/[가-힣A-Za-z0-9]/g)?.length ?? 0;
  if (chars < MIN_CHARS) problems.push(`${file}: 본문 ${chars}자 (${MIN_CHARS}자 미만)`);

  const references = (body.match(/references:\s*\[/) ? (body.split("references:")[1]?.match(/href:/g)?.length ?? 0) : 0);
  if (references < 2) problems.push(`${file}: 참고 자료 ${references}개 (2개 미만)`);

  const hasInternalLink = /href:\s*"\/articles\//.test(body);
  if (!hasInternalLink) problems.push(`${file}: 다른 글로 가는 내부 링크 없음`);

  rows.push({ slug: slug ?? name, chars, references, publishedAt, updatedAt: updatedAt ?? "" });
}

rows.sort((a, b) => a.chars - b.chars);
console.table(rows);

if (problems.length) {
  console.error(`\n문제 ${problems.length}건:`);
  for (const p of problems) console.error(" - " + p);
  process.exit(1);
}
console.log(`\n${files.length}개 글 검사 통과 (최소 ${MIN_CHARS}자)`);
