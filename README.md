# 알고가요 (algogayo.com)

알고 가면 덜 헤매는 생활 가이드. 생활비, 디지털 습관, 여행 준비를 바로 따라 할 수 있는 순서로 정리하는 한국어 사이트입니다.

Next.js 16(App Router, Turbopack) + React 19 + TypeScript, 콘텐츠는 마크다운, 배포는 Vercel.

## 로컬 실행

```bash
pnpm install
pnpm dev          # http://localhost:3000 (초안 글 포함)
pnpm build        # 프로덕션 빌드 = 콘텐츠 검증
pnpm start
pnpm lint
pnpm typecheck    # next typegen && tsc --noEmit
```

## 이어서 작업하기

지금까지의 작업 내용, 남은 일, 주의사항은 [`docs/handoff.md`](docs/handoff.md)에, 전체 계획은 [`docs/plan.md`](docs/plan.md)에 있습니다.

## 글 쓰기

- 글은 `content/posts/<slug>.md` 하나로 관리합니다. 작성 방법, 템플릿, 검증 규칙은 [`docs/writing-guide.md`](docs/writing-guide.md).
- `draft: true` 인 글은 개발 서버에서만 보이고 배포에서는 제외됩니다.
- frontmatter가 잘못되면 `pnpm build` 가 파일 이름과 이유를 알려 주며 실패합니다.

## 이미지

- 대표 이미지 프롬프트: [`docs/image-prompts.md`](docs/image-prompts.md)
- 원본을 `assets/images-src/posts/<slug>.png` 에 넣고 `pnpm images` 를 실행하면 `public/images/posts/<slug>.jpg` (1600×900)가 생깁니다. 원본은 git에 올리지 않습니다.
- 사이트 기본 OG 이미지는 `pnpm og` 로 `src/app/opengraph-image.png` 를 다시 만듭니다.

## 구조

```
content/posts/          글 (마크다운 + frontmatter)
docs/                   작성 가이드, 이미지 프롬프트
scripts/                이미지 변환, OG 생성
src/app/                라우트 (홈, 전체 글, 글, 카테고리, 소개, 문의, 개인정보, 약관, 404, feed.xml, sitemap, robots, manifest)
                        + 파일 규칙 메타데이터: favicon.ico, icon.svg, apple-icon.png, opengraph-image.png, twitter-image.png (+ .alt.txt)
src/components/         헤더·내비, 푸터, 카드, 카테고리 레일, 빵부스러기, 페이지 머리, 목차, 본문, 작성자, 이전/다음, JSON-LD
src/lib/site.ts         사이트 이름, 운영자(필명), AdSense 게시자 ID, 검색엔진 확인값, 내비게이션
src/lib/categories.ts   카테고리 3개와 폴백 이미지(public/images/categories/<slug>.jpg)
public/icons/           매니페스트·JSON-LD용 PNG 아이콘 (pnpm og 로 생성)
src/lib/posts.ts        마크다운 로더와 검증
src/lib/markdown.ts     마크다운 → HTML, 소제목 분리, 목차
src/lib/seo.ts          JSON-LD (WebSite, Article, BreadcrumbList, Person)
src/lib/legal.ts        정책 문서 시행일과 개정 이력
```

## 환경 변수 (Vercel)

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # Search Console HTML 태그 값
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=    # 네이버 서치어드바이저 메타 태그 값
```

AdSense 게시자 ID(`ca-pub-…`)는 공개 정보이므로 `src/lib/site.ts` 에 두었고, `public/ads.txt` 와 짝을 이룹니다.

## 운영자 정보 바꾸기

`src/lib/site.ts` 의 `author` (필명, 역할)와 `email` 을 고치면 소개 페이지, 글 하단 작성자 박스, 개인정보처리방침의 보호책임자, JSON-LD에 함께 반영됩니다.

## 검색엔진·AdSense

- 사이트맵 `/sitemap.xml`, RSS `/feed.xml`, `robots.txt` 는 빌드 시 자동 생성됩니다.
- AdSense 로더 스크립트와 `google-adsense-account` 메타 태그는 루트 레이아웃에 있습니다. 승인 후 광고 단위를 넣을 때는 글 페이지의 섹션 사이(`src/components/article-body.tsx`)와 데스크톱 사이드바(`src/app/articles/[slug]/page.tsx`)가 자리입니다.
