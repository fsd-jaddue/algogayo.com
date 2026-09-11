// 원본 PNG 일러스트 → WebP 압축, 아이콘/로고 PNG 생성
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "public/images";
const OUT = "public/images";
fs.mkdirSync(OUT, { recursive: true });

// 카테고리별 배경 일러스트 (기존 3장 재활용)
const categoryArt = {
  living: "household-budget.png",
  digital: "digital-organizing.png",
  travel: "weekend-travel.png",
};

for (const [category, file] of Object.entries(categoryArt)) {
  const input = path.join(SRC, file);
  if (!fs.existsSync(input)) continue;
  const output = path.join(OUT, `category-${category}.webp`);
  await sharp(input).resize(1600, 900, { fit: "cover" }).webp({ quality: 78 }).toFile(output);
  const { size } = fs.statSync(output);
  console.log(`${output}  ${(size / 1024).toFixed(0)} KB`);
}

// 아이콘·로고: src/app/icon.svg 래스터화
const icon = fs.readFileSync("src/app/icon.svg");
const targets = [
  ["public/logo.png", 512, 0],
  ["public/icon-192.png", 192, 0],
  ["public/icon-512.png", 512, 0],
  // maskable: 안전 영역(80%) 안에 마크가 들어가도록 여백을 둔다
  ["public/icon-512-maskable.png", 512, 56],
];
for (const [file, size, pad] of targets) {
  const inner = size - pad * 2;
  const mark = await sharp(icon, { density: 384 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#14213d" } })
    .composite([{ input: mark, left: pad, top: pad }])
    .png()
    .toFile(file);
  console.log(`${file}  ${size}x${size}`);
}
