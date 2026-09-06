// 사이트 기본 OG 이미지(1200×630)를 SVG로 그려 PNG로 저장한다.
// 실행: pnpm og   → src/app/opengraph-image.png
// 글 페이지는 각 글의 대표 이미지를 OG로 쓰므로 이 파일은 홈·목록·소개 같은 공통 페이지에만 쓰인다.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const out = path.resolve("src/app/opengraph-image.png");

// 실행 환경에 설치된 한글 폰트 중 앞에서부터 찾는다.
const korean = '"Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", "Noto Sans CJK KR", "NanumGothic", "Malgun Gothic", "WenQuanYi Zen Hei", sans-serif';
const latin = '"Helvetica Neue", Helvetica, Arial, "DejaVu Sans", sans-serif';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#14213d"/>
  <!-- 오른쪽 장식: 아이콘과 같은 형태 언어 -->
  <circle cx="1010" cy="200" r="150" fill="#f15b45"/>
  <path d="M760 630 A280 280 0 0 1 1200 470 L1200 630 Z" fill="#91c8e9" opacity="0.9"/>
  <path d="M880 330 h150 v150 c0 40 -30 70 -70 70 h-80 z" fill="#b9d8c2"/>
  <rect x="780" y="120" width="70" height="70" rx="20" fill="#fffdf8" opacity="0.15"/>
  <!-- 브랜드 마크 -->
  <path d="M96 100 h76 v64 c0 14 -12 26 -26 26 h-50 z" fill="#f15b45"/>
  <text x="134" y="164" text-anchor="middle" font-family='${korean}' font-size="46" font-weight="700" fill="#fffdf8">알</text>
  <!-- 사이트명 -->
  <text x="96" y="330" font-family='${korean}' font-size="132" font-weight="700" fill="#fffdf8" letter-spacing="-4">알고가요</text>
  <text x="100" y="410" font-family='${korean}' font-size="40" fill="#cbd3e4">알고 가면 덜 헤매는 생활 가이드</text>
  <text x="100" y="470" font-family='${korean}' font-size="28" fill="#8e98ac">생활비 · 디지털 · 여행</text>
  <text x="100" y="560" font-family='${latin}' font-size="34" font-weight="700" fill="#f15b45" letter-spacing="1">algogayo.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`saved ${path.relative(process.cwd(), out)} (${WIDTH}×${HEIGHT}, ${Math.round(fs.statSync(out).size / 1024)}KB)`);
