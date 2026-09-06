// 이미지 최적화: assets/images-src 의 원본을 사이트용 JPG로 변환한다.
//
//   assets/images-src/posts/<slug>.(png|jpg|jpeg|webp)      → public/images/posts/<slug>.jpg      (1600×900, 중앙 크롭)
//   assets/images-src/categories/<category>.(png|jpg|…)    → public/images/categories/<category>.jpg (1600×900)
//
// 실행: pnpm images
// 원본(assets/images-src)은 git에 올리지 않고, 변환된 public/images/** 만 커밋한다.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1600;
const HEIGHT = 900;
const QUALITY = 82;
const SOURCE_EXT = /\.(png|jpe?g|webp|avif)$/i;

const jobs = [
  { from: "assets/images-src/posts", to: "public/images/posts" },
  { from: "assets/images-src/categories", to: "public/images/categories" },
];

let converted = 0;
let skipped = 0;

for (const job of jobs) {
  const fromDir = path.resolve(job.from);
  const toDir = path.resolve(job.to);
  if (!fs.existsSync(fromDir)) continue;
  fs.mkdirSync(toDir, { recursive: true });

  for (const file of fs.readdirSync(fromDir)) {
    if (!SOURCE_EXT.test(file)) continue;
    const name = file.replace(SOURCE_EXT, "");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      console.warn(`건너뜀 (파일 이름은 소문자·숫자·하이픈만): ${file}`);
      skipped += 1;
      continue;
    }
    const source = path.join(fromDir, file);
    const target = path.join(toDir, `${name}.jpg`);

    // 원본이 산출물보다 오래됐으면 건너뛴다.
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs) {
      skipped += 1;
      continue;
    }

    await sharp(source)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(target);

    const kb = Math.round(fs.statSync(target).size / 1024);
    console.log(`${path.relative(process.cwd(), target)}  ${WIDTH}×${HEIGHT}  ${kb}KB`);
    converted += 1;
  }
}

console.log(`완료: ${converted}개 변환, ${skipped}개 건너뜀`);
if (converted === 0 && skipped === 0) {
  console.log("원본이 없습니다. assets/images-src/posts/<slug>.png 형태로 넣고 다시 실행하세요.");
}
