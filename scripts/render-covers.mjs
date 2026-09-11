// 글별 고유 대표 이미지(1600×900 WebP)와 기본 OG 이미지(1200×630 PNG)를 렌더링한다.
// 사용법: node scripts/render-covers.mjs [--force] [slug ...]
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const candidate of ["playwright", "/opt/node22/lib/node_modules/playwright", "/usr/lib/node_modules/playwright"]) {
    try { return require(candidate); } catch {}
  }
  throw new Error("playwright 를 찾을 수 없습니다. pnpm dlx playwright 또는 전역 설치가 필요합니다.");
}
const { chromium } = loadPlaywright();

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/posts");
fs.mkdirSync(OUT_DIR, { recursive: true });

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = new Set(args.filter((a) => !a.startsWith("--")));

const field = (src, name) => src.match(new RegExp(`\\b${name}:\\s*"([^"]*)"`))?.[1];
const posts = [];
for (const dir of ["src/content/posts", "src/content/drafts"]) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const src = fs.readFileSync(path.join(dir, file), "utf8");
    posts.push({ slug: field(src, "slug"), title: field(src, "title"), category: field(src, "category") });
  }
}

const palette = {
  living: { name: "생활비", accent: "#f15b45", tint: "rgba(20,33,61,0.86)", art: "category-living.webp" },
  digital: { name: "디지털", accent: "#91c8e9", tint: "rgba(12,20,40,0.88)", art: "category-digital.webp" },
  travel: { name: "여행", accent: "#b9d8c2", tint: "rgba(18,40,48,0.86)", art: "category-travel.webp" },
};

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const positions = ["22% 30%", "70% 35%", "40% 65%", "78% 70%", "15% 75%", "55% 20%"];

function coverHtml({ title, category, slug }) {
  const p = palette[category];
  const h = hash(slug);
  const pos = positions[h % positions.length];
  const topLayout = h % 2 === 0;
  const size = title.length > 34 ? 68 : title.length > 26 ? 76 : 86;
  const art = `file://${path.join(ROOT, "public/images", p.art)}`;
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1600px;height:900px;overflow:hidden;background:#14213d;font-family:"Gothic A1","Noto Sans KR",sans-serif}
  .art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos};filter:saturate(1.05)}
  .tint{position:absolute;inset:0;background:linear-gradient(${topLayout ? "180deg" : "0deg"}, ${p.tint} 0 46%, rgba(20,33,61,0.28) 100%)}
  .bar{position:absolute;left:0;top:0;bottom:0;width:22px;background:${p.accent}}
  .chip{position:absolute;left:150px;${topLayout ? "top:96px" : "bottom:96px"};display:inline-flex;align-items:center;gap:14px;padding:12px 24px;border-radius:999px;background:${p.accent};color:${category === "living" ? "#fffdf8" : "#14213d"};font:700 26px/1 "Noto Sans KR",sans-serif;letter-spacing:0.02em}
  .title{position:absolute;left:150px;right:150px;${topLayout ? "top:176px" : "bottom:176px"};color:#fffdf8;font-weight:900;font-size:${size}px;line-height:1.24;letter-spacing:-0.045em;word-break:keep-all;text-wrap:balance;max-width:1180px;text-shadow:0 4px 30px rgba(0,0,0,0.25)}
  .brand{position:absolute;right:150px;${topLayout ? "bottom:96px" : "top:96px"};display:flex;align-items:center;gap:16px;color:#fffdf8;font-weight:900;font-size:34px;letter-spacing:-0.04em}
  .mark{width:56px;height:56px;border-radius:17px 17px 4px 17px;background:#f15b45;display:grid;place-items:center;font-size:28px;box-shadow:6px 6px 0 rgba(255,253,248,0.9)}
  </style></head><body>
  <img class="art" src="${art}" alt="">
  <div class="tint"></div><div class="bar"></div>
  <div class="chip">${p.name} 가이드</div>
  <h1 class="title">${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
  <div class="brand"><span class="mark">알</span><span>알고가요</span></div>
  </body></html>`;
}

function ogHtml() {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:linear-gradient(135deg,#14213d 0 58%,#1b2a4a 58% 100%);font-family:"Gothic A1","Noto Sans KR",sans-serif;color:#fffdf8}
  .bar{position:absolute;left:0;top:0;bottom:0;width:18px;background:#f15b45}
  .wrap{position:absolute;left:110px;top:110px;right:110px}
  .brand{display:flex;align-items:center;gap:20px;font-weight:900;font-size:64px;letter-spacing:-0.05em}
  .mark{width:84px;height:84px;border-radius:24px 24px 6px 24px;background:#f15b45;display:grid;place-items:center;font-size:40px;box-shadow:8px 8px 0 #fffdf8}
  .tag{margin-top:44px;font-weight:900;font-size:58px;line-height:1.2;letter-spacing:-0.045em;max-width:900px}
  .cats{position:absolute;left:110px;bottom:96px;display:flex;gap:14px}
  .cats span{padding:12px 26px;border-radius:999px;border:2px solid rgba(255,253,248,0.5);font:700 26px/1 "Noto Sans KR",sans-serif}
  .url{position:absolute;right:110px;bottom:104px;font:700 26px/1 "Noto Sans KR",sans-serif;color:#cbe9f6;letter-spacing:0.02em}
  </style></head><body><div class="bar"></div>
  <div class="wrap"><div class="brand"><span class="mark">알</span><span>알고가요</span></div>
  <div class="tag">읽고 바로 써먹는<br>생활 가이드</div></div>
  <div class="cats"><span>생활비</span><span>디지털</span><span>여행</span></div>
  <div class="url">algogayo.com</div></body></html>`;
}

const launchOptions = {};
if (fs.existsSync("/opt/pw-browsers/chromium-1194/chrome-linux/chrome")) {
  launchOptions.executablePath = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
}
const browser = await chromium.launch(launchOptions);
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  let rendered = 0;
  for (const post of posts) {
    if (!post.slug || !post.category) continue;
    if (only.size && !only.has(post.slug)) continue;
    const out = path.join(OUT_DIR, `${post.slug}.webp`);
    if (fs.existsSync(out) && !force) continue;
    await page.setContent(coverHtml(post), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    await sharp(png).webp({ quality: 80 }).toFile(out);
    rendered += 1;
    console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
  }
  const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await ogPage.setContent(ogHtml(), { waitUntil: "load" });
  await ogPage.evaluate(() => document.fonts.ready);
  const ogPng = await ogPage.screenshot({ type: "png" });
  await sharp(ogPng).png({ compressionLevel: 9, palette: true }).toFile(path.join(ROOT, "public/og-default.png"));
  console.log(`public/og-default.png  ${(fs.statSync("public/og-default.png").size / 1024).toFixed(0)} KB`);
  console.log(`covers rendered: ${rendered}, total posts: ${posts.length}`);
} finally {
  await browser.close();
}
