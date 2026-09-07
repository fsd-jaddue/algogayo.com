# 알고가요(algogayo.com) 재구축 계획 — AdSense 승인 1순위 (2026-09-06 승인된 계획 원문)

## Context

GPT/Codex로 만든 Next.js 16 사이트로 AdSense 승인을 **신청한 상태**(아직 미승인). 사용자는 현재 신청을 취소하고 재신청할 예정이며, 1순위는 **승인 통과**다. 코드·구조·디자인·정책 문서는 전부 바꿔도 되고, 이미지는 내가 쓴 프롬프트로 사용자가 GPT에서 생성한다.

현재 코드 평가: 구조는 무난하지만 승인 심사에서 약한 지점이 분명하다. 글 8편(한국어 문장은 자연스럽고 과장이 없어 **텍스트는 살린다**)에 이미지 3장이 돌려쓰이고, 본문이 TS 객체에 하드코딩되어 글을 늘리기 어렵다. 개인정보처리방침은 Google 필수 고지와 한국 개인정보보호법 §30 항목이 빠져 있다. OG 이미지·RSS·네이버 등록이 없고 폰트도 실제로 로드되지 않는다.

사용자 결정(확인 완료):
- 운영자: **필명 + 간단 소개**
- 신규 글: **12편(카테고리별 4편)** → 총 **20편**(기존 8편: 생활비 3·디지털 3·여행 2)
- 이미지: **기존 3장 포함 전부 실사 스타일로 교체**(프롬프트 §7)
- 디자인: 팔레트(크림·네이비·코랄) 유지, 레이아웃·타이포 재구성
- URL(`/articles/[slug]`, `/category/[slug]`) 유지

이 세션은 네트워크가 차단되고 node_modules가 없어 라이브 점검·빌드를 못 했다(§8에서 로컬 확인). 설계 검토 에이전트의 비판을 반영해 과한 항목(글별 OG 생성, GA4, CI, AVIF, WebP 변환, 본문 웹폰트)은 뺐다.

---

## 1. 승인 심사 관점의 진단

### AdSense가 보는 것과 현재 상태
| 심사 항목 | 현재 | 조치 |
|---|---|---|
| 충분한 고유 콘텐츠 | 8편, 이미지 3장 반복 | **20편**, 글마다 고유 이미지, 편당 2,000자 이상 |
| 작성자 정보(누가 쓴 글인지) | "알고가요 편집팀"만 | 필명·소개·작성자 박스·JSON-LD Person |
| 필수 페이지 | 소개·문의·개인정보·약관 있음 | 개인정보처리방침에 Google 필수 고지 + 개인정보보호법 §30 항목 추가, 약관에 광고 조항, 소개에 광고 게재 고지 |
| 탐색 구조 | 헤더 5개·푸터 링크, 모바일 메뉴 없음 | 모바일 햄버거, 푸터에 모든 페이지, 브레드크럼, 빈 카테고리 없음(각 6~7편) |
| 사이트 완성도 | 홈이 마케팅 랜딩, 히어로에 "어떻게 만드는지" 버튼 | 콘텐츠 우선 홈, 빈 상태·준비 중 문구 0개, 404 정상 |
| AdSense 코드·소유 확인 | `<head>` 스크립트 + 메타 + ads.txt 있음 | **그대로 유지**(React 19가 `<script async>`를 head로 호이스팅하므로 SSR HTML에 그대로 남음). `next/script`로 바꾸지 않음 |
| 크롤러 접근 | robots allow | Cloudflare **Bot Fight Mode / Under Attack 꺼짐** 확인(심사 실패 사유 "사이트 다운 또는 사용 불가"의 흔한 원인) |
| 색인 상태 | 불명 | Search Console·네이버 서치어드바이저 사이트맵 제출, 재신청 전 색인 확인 |
| 이미지 저작권 | 자체 생성 | 유지. alt·소개 문구에서 "일러스트/사진" 매체 언급 제거 |

### 코드 문제(승인과 무관하지만 함께 정리)
1. `@import "tailwindcss"`만 있고 유틸리티 0개. **단, 수제 CSS가 Preflight 리셋(제목 굵기·리스트 여백)에 기대고 있어** 제거 시 명시적 리셋 필요.
2. 본문이 `src/lib/post-content.ts` 중첩 객체 → 마크다운으로 이전.
3. `next build --webpack` 이유 불명, webpack 설정도 없음 → 기본(Turbopack)으로.
4. `[slug]` 페이지에 `dynamicParams = false` 없음. 타입체크 스크립트 없음.
5. 카드 제목이 `<h2>`라 홈에서 섹션 제목과 동급. 목차 앵커 id가 `"1"`, `"2"`.
6. 폰트 선언만 있고 로드 없음. OG 이미지·RSS 없음. 사이트맵 날짜 하드코딩.

---

## 2. 기술 결정

| 항목 | 결정 | 이유 |
|---|---|---|
| 콘텐츠 포맷 | `content/posts/*.md` + frontmatter. `gray-matter` + `unified`(remark-parse, remark-gfm, remark-rehype, rehype-stringify) + 자체 rehype 플러그인(h2에 `section-n` id, h2 기준 섹션 분리) | 혼자 한국어로 쓰는 운영자에게 MDX는 과함. 어디서든 편집, Next 버전 무관 |
| 콘텐츠 검증 | `posts.ts` 로더가 frontmatter 검증, 실패 시 throw → **빌드가 곧 검증** | pnpm은 `prebuild` 같은 lifecycle 훅을 기본 실행하지 않음 |
| 스타일 | Tailwind 제거 + 약 20줄 명시적 리셋 + 기존 토큰 유지 | Preflight 의존을 리셋으로 대체 |
| 폰트 | 본문 **시스템 스택**(Apple SD Gothic Neo / 삼성 기본 / Malgun Gothic). **제목만** `next/font/google` Noto Serif KR(variable, `preload: false`, `display: swap`) | 본문 한글 웹폰트는 글 한 편에 수백 KB. 세리프 제목만으로 편집형 인상 |
| OG 이미지 | 글별 OG = 대표 사진 그대로(`openGraph.images: [{url, width:1600, height:900}]`). 기본 OG는 `src/app/opengraph-image.png` 정적 1장(`scripts/make-og.mjs`가 SVG→PNG 1회 생성, 라틴 워드마크만) | 글마다 사진이 생기므로 Satori·한글 폰트 서브셋 불필요 |
| AdSense 코드 | 현재 `<head>`의 `<script async src=…adsbygoogle.js>` + `google-adsense-account` 메타 + `ads.txt` **유지** | 심사 크롤러가 SSR HTML에서 그대로 확인. 광고 단위는 승인 후 |
| 광고 자리 | `<AdSlot>` 클라이언트 컴포넌트를 **승인 후** 추가(슬롯 id 상수, id 비면 null, `data-adsbygoogle-status` 확인 후 push, pathname key, min-height 예약) | 심사 중 빈 광고 자리는 무의미 |
| 분석 | GA4 넣지 않음 | Search Console·네이버·AdSense 리포트로 충분. 쿠키·동의 표면 축소 |
| 작성자 | `siteConfig.author = { name: 필명, role, url }`, 이메일은 `siteConfig.email` (bio는 이후 결정으로 제거, 필명 = 사이트명) | 사용자 결정 |
| 이미지 규약 | `public/images/posts/<slug>.jpg`(1600×900). 없으면 `public/images/<category>.png`(기존 3장) 폴백. PNG 변환·삭제 안 함 | `next/image`가 요청 시 WebP로 변환 |
| 게시 방식 | 신규 12편은 `draft: true`로 커밋 → **3~4편씩 3회, 열흘 안에** 실제 날짜로 게시 → 색인 확인 후 재신청. **(2026-09-07 변경: 사용자 결정으로 12편을 `publishedAt: 2026-09-07`로 한 번에 공개함. 본인 경험 추가는 게시 후 `updatedAt`을 갱신하며 진행)** | 하루에 12편은 대량 생산으로 보임. 심사 시점엔 20편 모두 공개 |
| 다크 모드·검색·공유·CI | 하지 않음/연기 | 20편 규모에 불필요. Vercel 프리뷰 빌드가 게이트 |
| 라우팅 | URL 유지, `dynamicParams = false` | 알 수 없는 slug는 404 |

---

## 3. 목표 파일 구조

```
content/posts/*.md                  # 20편 (기존 8 + 신규 12)
docs/image-prompts.md               # §7 프롬프트 시트
docs/writing-guide.md               # 글 추가 절차, frontmatter 규약
assets/images-src/<slug>.png        # GPT 생성 원본
public/
  ads.txt
  images/*.png                      # 기존 3장 (폴백)
  images/posts/<slug>.jpg           # scripts/optimize-images.mjs 산출물
scripts/
  optimize-images.mjs               # 1536×1024 → 1600×900 중앙 크롭 JPG (sharp 0.35.4 고정)
  make-og.mjs                       # 기본 OG PNG
  migrate-posts.mjs                 # post-content.ts → md 일회성 (실행 후 삭제)
src/
  app/
    layout.tsx                      # 제목 폰트, 헤더/푸터, AdSense head 스크립트(유지), WebSite JSON-LD
    page.tsx                        # 콘텐츠 우선 홈
    opengraph-image.png
    articles/page.tsx
    articles/[slug]/page.tsx        # dynamicParams = false
    category/[slug]/page.tsx        # dynamicParams = false
    about/ contact/ privacy/ terms/ page.tsx
    feed.xml/route.ts               # RSS 2.0, force-static
    sitemap.ts robots.ts manifest.ts not-found.tsx icon.svg favicon.ico globals.css
  components/
    site-header.tsx  mobile-nav.tsx(client)  site-footer.tsx
    article-card.tsx  category-rail.tsx  article-toc.tsx  article-body.tsx
    author-box.tsx  post-nav.tsx  json-ld.tsx  (ad-slot.tsx는 승인 후)
  lib/
    site.ts        # 이름·URL·author·navigation·adsense client·verification(google, naver)
    posts.ts       # fs + gray-matter, 검증, getAllPosts/getPost/getByCategory/getAdjacent
    markdown.ts    # unified 파이프라인, section-n id, hast 분리, TOC, 글자 수
    categories.ts  seo.ts(WebSite/Article/BreadcrumbList)  legal.ts(시행일·개정 이력)
```

삭제: `src/lib/post-content.ts`, `postcss.config.mjs`, `tailwindcss`·`@tailwindcss/postcss`.
추가: `gray-matter`, `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-stringify`, `hast-util-to-string`, (dev) `sharp@0.35.4`.

### frontmatter 규약
```yaml
---
title: "장보기 전 20분, 식비와 음식물 쓰레기를 함께 줄이는 주간 식단법"
description: >-
  냉장고 확인부터 공통 재료 고르기까지 매주 반복할 수 있는 순서를 정리했습니다.
category: living            # living | digital | travel
publishedAt: 2026-08-28
updatedAt: 2026-09-06       # 선택
draft: false                # true면 빌드 제외(dev에서만 보임)
image: /images/posts/weekly-meal-plan-without-waste.jpg   # 선택
imageAlt: 냉장고 문을 열고 종이 목록을 든 손          # 매체(사진/일러스트) 언급 금지
summary: [ … ]              # 선택. 없으면 요약 박스 생략
checklist: [ … ]            # 선택
closing: >-                 # 선택
  …
---
## 냉장고를 재고표처럼 5분만 살펴보기
본문…

> **알아두세요** 새 레시피는 한 주에 한 가지만…
```
- 슬러그 = 파일명. 한국어 문장에 `: `가 흔하므로 긴 값은 `>-` 블록 스칼라(writing-guide에 명시).
- 읽기 시간 = 본문 글자 수 ÷ 500자/분. 인용문(`>`)은 "알아두세요" 박스.

---

## 4. 구현 순서 (각 단계 끝에 배포 가능)

### Phase 0 — 준비
1. `main`에서 새 브랜치, `pnpm install`.
2. **AGENTS.md 지시대로 `node_modules/next/dist/docs/`에서 §9 항목 확인.**
3. 기준선 `pnpm build`(`--webpack`) 통과 확인 → 플래그 제거 후 재빌드. 실패 시 원인 기록 후 유지.
4. `package.json`: `"typecheck": "next typegen && tsc --noEmit"`, `"build": "next build"`.
5. 두 `[slug]` 페이지에 `export const dynamicParams = false`.
6. §8 라이브·Cloudflare 점검.

### Phase 1 — 정책 문서·작성자 (텍스트만, 당일 배포)
1. `site.ts`: `author`(필명·역할·소개·이메일), `verification`(google, naver 자리), `legal.ts`(시행일).
2. **privacy** 전면 재작성(§5). **terms**에 "광고 및 수익" 조항 + 준거법. **about**에 운영자 소개·편집 원칙(홈 values 이관)·이미지 정책("사이트용으로 제작한 이미지", "촬영"이라 주장 안 함)·광고 게재 고지·문의.
3. 글 하단 작성자 박스와 Article JSON-LD author를 `Person`으로. `imageAlt`에서 "일러스트" 제거.

### Phase 2 — 콘텐츠 파이프라인 (시각 변화 없음)
1. `markdown.ts`: 마크다운 → hast → h2마다 `section-1…n` → **hast children을 h2 경계로 분리**(HTML 문자열 split 금지) → 섹션별 HTML + TOC + 글자 수.
2. `posts.ts`: `content/posts` 읽기 → 검증(필수 필드, 고유 slug, ISO 날짜, category, image 존재, description 40~160자, 본문 ≥ 900자(공백 제외; 구현 시 완화한 값, 목표는 1,800자 이상)) → throw → `draft` 제외 → 날짜 내림차순.
3. `scripts/migrate-posts.mjs`로 8편 변환·커밋 후 삭제. 텍스트·날짜 불변. 소제목의 "1. " 접두 제거(번호는 CSS 카운터).
4. 페이지 연결, `post-content.ts` 삭제. 빌드·배포.

### Phase 3 — 레이아웃·디자인
1. Tailwind 제거 + 리셋(box-sizing, 제목 margin/weight, 리스트 padding, img max-width, 버튼 font inherit). 토큰 유지.
2. Noto Serif KR → `--font-serif`, h1/h2에만. 본문 시스템 스택.
3. 헤더: 로고 + 데스크톱 내비 + 모바일 햄버거(`aria-expanded`, Escape 닫기, 포커스 복귀, `usePathname` 변경 시 닫힘, `aria-current="page"`).
4. 홈: 최신 1편 큰 카드 + 2편 보조 → 카테고리 레일(각 3편 + 더 보기) → 한 줄 소개 + About 링크. 히어로·values 제거.
5. 목록/카테고리: 카드 그리드, 카드 제목 `<h3>`(홈)/`<h2>`(목록). 카테고리 상단 설명 + 글 수.
6. 글: 브레드크럼 → h1 → 메타(작성자·게시일·수정일·읽기 시간) → 커버(16:9, `priority`) → 요약(h2) → 섹션(h2, CSS 카운터) → 체크리스트 → 마무리 → 작성자 박스 → 이전/다음 → 같은 카테고리. 데스크톱 sticky 목차(왼쪽), 오른쪽 여백은 승인 후 사이드바 광고용. 모바일 목차 `<details>`.
7. 타이포: 본문 17px / 1.85, 최대 폭 700px, `overflow-wrap: anywhere`. 반응형 3단계, `prefers-reduced-motion`, 포커스 링.
8. 푸터: 모든 페이지 링크(전체 글·카테고리 3·소개·문의·개인정보·약관·RSS). Contact/404 재구성.

### Phase 4 — SEO·색인
1. `layout.tsx` metadata: 기본 OG, `twitter.card: summary_large_image`, `alternates.types` RSS, `verification: { google, other: { "naver-site-verification" } }`.
2. 글: `openGraph.images`(대표 사진), `article:*`, `authors`.
3. `seo.ts`: `WebSite`, `Article`(Person, publisher, image, dates, wordCount, articleSection), `BreadcrumbList`(글·카테고리).
4. `feed.xml/route.ts`: RSS 2.0 최근 20편, `force-static`.
5. `sitemap.ts`: 글은 `updatedAt ?? publishedAt`, 홈/목록/카테고리는 집합의 최대 수정일.
6. `not-found` noindex. 배포 → Search Console 사이트맵 재제출, **네이버 서치어드바이저·다음 등록 + RSS 제출**.

### Phase 5 — 신규 글 12편 (초안 → 3회 분할 게시)
- 톤: 결론 먼저, 순서형, 조건·예외 명시, 과장 없음. 2,000~3,000자. **구조는 글마다 다르게**(표, 단계, Q&A, 비교 섞기. 요약·체크리스트는 필요한 글에만). 금융·보험·의료 조언으로 읽히는 문장 금지, 필요 시 면책 인용문.
- 사용자가 초안마다 실제 경험·구체 정보 한두 곳 추가 → `draft: false` + 실제 날짜 → 3~4편씩 3회 배포(열흘 안).

| 카테고리 | slug | 제목(안) | 주의 |
|---|---|---|---|
| 생활비 | `budget-tracking-five-items` | 가계부를 3주 만에 포기하지 않는 법: 항목 5개로 시작하는 기록 습관 | |
| 생활비 | `mobile-plan-checkup` | 통신 요금제 점검: 실제 데이터 사용량 확인부터 요금제 바꾸기까지 | 특정 통신사·요금 수치 금지 |
| 생활비 | `selling-used-items-prep` | 안 쓰는 물건 중고로 팔기 전에: 가격 정하기와 안전 거래 준비 순서 | |
| 생활비 | `delivery-spending-rules` | 배달 음식 지출 줄이기: 금지 대신 횟수 규칙으로 바꾸는 법 | |
| 디지털 | `smartphone-storage-cleanup` | 스마트폰 저장 공간 정리: 삭제하기 전에 확인할 순서 | |
| 디지털 | `smishing-check-before-tap` | 스미싱·스팸 문자 구별법: 링크를 누르기 전 확인하는 다섯 가지 | 검증 가능한 절차만, 118(KISA)·112 안내 |
| 디지털 | `unused-accounts-cleanup` | 쓰지 않는 계정 정리: 가입한 서비스 찾아내고 탈퇴하는 순서 | |
| 디지털 | `parents-phone-basic-setup` | 부모님 스마트폰 기본 설정 도와드리기: 글자 크기, 스팸 차단, 연락처 백업 | 기기별 메뉴 이름 다름을 명시 |
| 여행 | `hotel-booking-checklist` | 숙소 예약 전 확인 목록: 취소 규정, 체크인 시간, 주차, 후기 읽는 법 | |
| 여행 | `first-rental-car-guide` | 렌터카 처음 빌릴 때: 계약서에서 확인할 항목과 반납 전 사진 | "보험 선택" 프레임 금지. 옵션이 무엇을 보장하는지 설명만, 추천 없음, 면책 인용문 |
| 여행 | `day-trip-by-train` | 당일치기 기차 여행 계획: 시간표 짜기와 역 주변 동선 정리 | |
| 여행 | `travel-phone-battery-data` | 여행 중 휴대폰 배터리와 데이터 관리: 저전력 모드, 오프라인 지도, 보조배터리 | |

### Phase 6 — 재신청 (§8 체크리스트 통과 후)
AdSense에서 사이트 삭제 → 재추가 → 코드 확인 → 검토 요청.

### Phase 7 — 승인 후
`ad-slot.tsx` + 배치 3곳(본문 2번째 섹션 뒤(섹션 ≥ 3일 때), 마무리 아래, 데스크톱 sticky 사이드바) → 광고 단위 3개 생성 → `ads.ts`에 id → 배포. Auto ads는 앵커만, URL 제외에 `/privacy`, `/terms`, `/contact`, `/about`. GDPR(EEA/UK) 메시지 게시.

### 마무리 산출물
`scripts/optimize-images.mjs`, `scripts/make-og.mjs`, `docs/writing-guide.md`, `docs/image-prompts.md`, README(글 추가 절차·이미지 규격·환경 변수).

---

## 5. 정책 문서 내용 (Phase 1)

**개인정보처리방침**(개인정보보호법 §30 순서): ① 처리자·적용 범위 ② 수집 항목·방법(문의 이메일, 접속 로그, 쿠키) ③ 처리 목적 ④ 보유·이용 기간 ⑤ 파기 절차·방법 ⑥ 제3자 제공(없음) ⑦ 처리 위탁·국외 이전(Vercel·Cloudflare·Google — 국가·항목·목적·기간) ⑧ 쿠키 등 자동수집장치의 설치·운영·거부(Chrome/Safari/Samsung Internet 경로) ⑨ **광고 서비스**: "Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로 광고를 게재합니다", Google 광고 설정(adssettings.google.com)·aboutads.info 해제 링크, policies.google.com/technologies/partner-sites 링크. 심사 중이므로 "게재하거나 게재할 수 있습니다"로 표현 ⑩ 정보주체 권리·행사 방법 ⑪ 만 14세 미만 ⑫ 안전성 확보 조치 ⑬ 개인정보 보호책임자(필명·역할·이메일 — 필명 사용은 사용자가 감수하는 절충) ⑭ 권익침해 구제(개인정보침해신고센터 118, 분쟁조정위원회 1833-6972, 대검찰청 1301, 경찰청 182) ⑮ 시행일·개정 이력.

**이용약관**: 기존 9개 조항 유지 + "광고 및 수익"(AdSense 광고 게재, 광고 내용은 광고주 책임, 제휴 링크 시 표시) + 준거법·분쟁.

**소개**: 다루는 주제, 운영자 필명·관심 분야·글 쓰는 이유, 편집 원칙 4가지, 콘텐츠·이미지 정책, 광고 게재 고지, 문의.

---

## 6. 검증

```bash
pnpm install && pnpm lint && pnpm typecheck && pnpm build && pnpm start
```
- 빌드 출력에서 모든 글·카테고리가 정적이고 `draft` 글이 목록에 없는지.
- `curl -sI localhost:3000/{,articles,category/living,about,privacy,terms,contact,feed.xml,sitemap.xml,robots.txt,ads.txt,없는slug}` → 200/404.
- `curl -s localhost:3000/ | grep -o 'adsbygoogle.js[^"]*\|google-adsense-account[^>]*'` → SSR HTML에 스크립트·메타 존재.
- 글 페이지 JSON-LD를 https://validator.schema.org 에서 검증(Article·BreadcrumbList). `og:image`가 대표 사진.
- Lighthouse(모바일): Performance ≥ 90, SEO 100, Accessibility ≥ 95, CLS < 0.1.
- 모바일: 햄버거 열기/닫기, Escape, 라우트 이동 시 닫힘, 포커스 복귀.
- 잘못된 frontmatter로 `pnpm build`가 명확한 메시지로 실패하는지.
- Vercel Preview에서 재확인 후 main 머지 → Search Console URL 검사 라이브 테스트, 리치 결과 테스트, 네이버 수집 요청.

---

## 7. 이미지 프롬프트 시트 (GPT 이미지 생성용, 20장 + 폴백 3장)

### 공통 스타일 (모든 프롬프트 앞에 붙임)
> Editorial documentary-style photograph for a Korean lifestyle magazine. Shot on a full-frame camera with a 35mm f/2 lens, soft natural window light from one side, shallow depth of field, true-to-life slightly muted colors. Props quietly echo a cream, navy and coral palette (a navy notebook, a coral mug, cream linen) without looking styled. Ordinary Korean apartment or everyday Korean setting. Candid, unstaged feel with one small imperfection (a crumb, a wrinkled cloth, an uneven stack). No faces — hands or a partial figure from behind at most. Absolutely no readable text anywhere: all printed or on-screen text is illegible blur. No logos or brand marks: plain unbranded packaging, no maker logo on laptops or phones, generic heavily blurred app UI, no car badges or emblems, blank license plates. No watermark. Not an illustration, no HDR glow, no perfect symmetry, no floating objects. Aspect ratio 16:9.

생성 규격: 1536×1024로 생성 → `assets/images-src/<slug>.png` 저장 → `pnpm images`가 1600×900 중앙 크롭 JPG로 변환.

"AI처럼 보이지 않게": 얼굴 넣지 않기 · 렌즈·조명 구체 지정 · 결점 한 가지 명시 · 사물 3~5개 · "muted, true-to-life" · 과하게 대칭·광택이면 "less polished, more like a real snapshot"으로 재생성.

### 기존 글 8장
| slug | 장면 프롬프트(공통 스타일 뒤에 이어 붙임) |
|---|---|
| `weekly-meal-plan-without-waste` | An open fridge door seen from the side in a small Korean kitchen; a hand holds a small paper list (writing illegible), a few unlabeled glass containers and half a bunch of spring onions on the shelf, a navy pen clipped to the list. |
| `smartphone-notification-reset` | A smartphone face-down on a wooden desk beside a closed unbranded laptop and a cooling cup of coffee, late afternoon light, a paper notebook open to a short handwritten list (illegible). |
| `weekend-trip-light-packing` | A small navy backpack half-packed on a bed, two folded shirts, one pair of jeans, a compact toiletry pouch and a coiled charger cable in a loose row on cream bedding, morning light. |
| `fixed-expense-review` | A kitchen table with a plain white printed statement (all text blurred, no bank marks), a highlighter, a simple calculator and a coral mug; a hand circles one line. |
| `photo-backup-three-step` | A phone connected by cable to an unbranded laptop on a desk, a small plain external SSD beside it, soft window light, a plant leaf entering the frame edge. |
| `rainy-day-travel-plan` | A rainy city street seen from under a café awning; a folded compact umbrella and a paper map (unreadable) with a phone on a small round table, drops on the glass, soft grey light. |
| `grocery-unit-price` | Supermarket shelf with two sizes of the same staple in plain unbranded bags (rice), a hand holding a phone with a blurred calculator screen, price tags out of focus and unreadable. |
| `password-manager-start` | A closed navy notebook with an elastic band, a small hardware security key on a plain keyring, and a phone showing a blurred lock screen, on a desk, side light. |

### 신규 글 12장
| slug | 장면 프롬프트 |
|---|---|
| `budget-tracking-five-items` | A simple paper ledger with five handwritten columns (illegible), a pencil, a few receipts folded once with blurred print, a navy mug on a cream tablecloth, evening lamp light. |
| `mobile-plan-checkup` | A phone showing a heavily blurred ring-shaped usage chart, held above a kitchen counter, a plain folded paper bill (no logo, text blurred) and a pen beside it, morning light. |
| `selling-used-items-prep` | A cleaned unbranded electric kettle on a plain cream cloth by a window, a phone on a small tripod photographing it, a lint roller nearby. |
| `delivery-spending-rules` | A kitchen counter with a simple home-cooked bowl of rice and two side dishes in plain white dishes, a phone face-down beside it, a small paper calendar with a few hand-drawn marks (illegible), evening light. |
| `smartphone-storage-cleanup` | A phone on a desk showing a blurred horizontal storage bar, a cable, a small cardboard box of old accessories, tidy but lived-in desk, side window light. |
| `smishing-check-before-tap` | A phone held at arm's length showing a blurred unread message bubble, thumb hovering without touching the screen, out-of-focus living room behind, cautious mood. |
| `unused-accounts-cleanup` | An unbranded laptop on a dining table with a blurred inbox, a sticky note with a short handwritten list (illegible), a pen, a cooling tea cup, quiet morning. |
| `parents-phone-basic-setup` | Two pairs of hands at a dining table: an older hand holding a phone with a blurred large-text settings screen, a younger hand pointing at it, a cup of barley tea nearby, warm afternoon light, no faces. |
| `hotel-booking-checklist` | A hand holding a phone with a heavily blurred lodging photo and blurred text, above a paper notebook with a short checklist (illegible), a small card wallet and keys on a wooden table. |
| `first-rental-car-guide` | A plain compact car seen from the rear quarter in a parking lot, no badge or emblem, blank license plate; a hand photographing a small scuff on the bumper with a phone, overcast even light. |
| `day-trip-by-train` | A train window seat seen from behind, a small tote bag and a folded paper sheet (unreadable) on the fold-down tray, Korean countryside blurred outside, morning light. |
| `travel-phone-battery-data` | A café table by a window with a phone charging from a small plain power bank, a folded paper map (unreadable), a backpack strap at the edge of frame, soft daylight. |

### 카테고리 폴백 3장(선택)
| 카테고리 | 장면 |
|---|---|
| living | Kitchen table with a plain folded receipt (blurred), a simple calculator and a coral mug, nothing else. |
| digital | A phone face-down beside a closed navy notebook on a clean desk. |
| travel | A packed small suitcase by an apartment door with keys on top. |

---

## 8. 사용자가 직접 할 일

**로컬에서 먼저 확인**
```bash
curl -sI https://algogayo.com | grep -iE 'server|cf-ray|x-vercel'   # cf-ray 있으면 Cloudflare 프록시
curl -sI https://www.algogayo.com | grep -iE 'HTTP|location'        # 301 → https://algogayo.com/
curl -s https://algogayo.com/ads.txt; curl -s https://algogayo.com/robots.txt
curl -s -A "Mediapartners-Google" -o /dev/null -w '%{http_code}\n' https://algogayo.com/   # AdSense 크롤러 UA로 200이어야 함
```
- Cloudflare: 프록시(주황)면 **DNS-only(회색)** 권장. 유지 시 SSL/TLS Full (strict), **Bot Fight Mode·Under Attack Mode 끄기**, Rocket Loader·Email Obfuscation 끄기.
- Cloudflare Email Routing으로 `contact@algogayo.com` 포워딩 후 테스트 발송.
- Vercel: `www` → apex 리다이렉트, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

**콘텐츠**
- `site.ts`에 필명·역할·소개·이메일 입력.
- §7 프롬프트로 이미지 20장 생성 → `assets/images-src/<slug>.png` → `pnpm images`.
- 신규 글 초안에 본인 경험·구체 정보 추가 → 3~4편씩 `draft: false`.

**색인**
- Search Console 사이트맵 재제출. 네이버 서치어드바이저 등록 → 확인 메타값을 `site.ts`에 → 사이트맵·RSS 제출. 다음 검색등록.

**재신청 전 체크리스트**
- [ ] 20편 모두 공개, 각 2,000자 이상, 고유 이미지
- [ ] Search Console "페이지" 보고서에서 글 대부분 색인됨(최소 며칠 대기)
- [ ] 헤더·푸터에서 소개·문의·개인정보·약관 도달, 빈 카테고리·"준비 중" 없음
- [ ] `view-source`에 adsbygoogle.js 스크립트와 `google-adsense-account` 메타, `/ads.txt` 200
- [ ] Mediapartners-Google UA로 200, robots에 차단 없음
- [ ] 모바일에서 메뉴·글·이미지 정상, 콘솔 오류 없음
- [ ] 문의 메일 수신 테스트 완료

---

## 9. Next 16에서 로컬 문서(`node_modules/next/dist/docs`)로 먼저 확인할 것
1. `next typegen` 존재와 `LayoutProps`/`PageProps` 생성 위치.
2. `dynamicParams = false` 의미.
3. `next/font/google` `Noto_Serif_KR` — `weight: "variable"`, `subsets: ["korean"]`, `preload: false` 지원, preload 링크 대량 생성 여부.
4. `route.ts` GET + `export const dynamic = "force-static"`이 `feed.xml`을 정적으로 내보내는지.
5. React 19에서 루트 레이아웃 `<head>`의 `<script async src crossOrigin>`이 SSR HTML에 그대로 남는지(현재 방식 유지 근거).
6. `metadata.alternates.types`(RSS), `metadata.verification.other`(네이버).
7. `images.qualities` 기본 `[75]`, `formats` 기본 webp — 기본값 유지, `quality` prop 미사용.
8. Turbopack 기본 빌드에서 `next/font`·마크다운 파이프라인 비호환 유무.
9. `content/`가 빌드 시 `fs.readdirSync`로만 읽히므로 정적 생성이면 파일 트레이싱 이슈 없음(`dynamicParams=false`로 보장).

---

## 10. 리스크와 완화
- **Tailwind 제거로 제목 굵기·리스트 여백 변화** → 리셋을 같은 커밋에, 전 페이지 육안 확인.
- **기존 글 날짜**(사이트 생성 전 날짜) → 유지. 텍스트 손보면 `updatedAt`만 실제 날짜. 신규 글은 실제 게시일.
- **필명 보호책임자** → 법적 완결성은 사용자가 감수. 역할·도달 가능한 이메일 표기.
- **12편 일괄 게시** → `draft`로 3회 분할하기로 했으나, 2026-09-07 사용자 결정으로 12편을 한 번에 공개함. 재신청은 색인 확인 후에 하므로 게시 간격보다 색인 상태를 본다.
- **이미지 교체 후 alt·About 문구** → "사진"·"촬영" 표현 금지, 장면 묘사만.
- **재신청 타이밍** → 20편 색인 확인 전 신청하면 같은 사유로 거절될 수 있음. 체크리스트 통과 후.
- **작업량** → Phase 0~4를 먼저 배포하고 Phase 5는 4편씩 3회 커밋.
