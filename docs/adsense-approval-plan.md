# 알고가요(algogayo.com) 애드센스 승인 확률 개선 계획

## 진행 현황 (2026-09-11 기준)

| 단계 | 상태 | 비고 |
|---|---|---|
| P0 콘텐츠 모델·헬퍼 | 완료 | `src/content/posts/*.ts` 분리, `src/lib/posts.ts` 헬퍼, 읽기 시간 자동 계산 |
| P1 메인·푸터·카테고리 | 완료 | 카테고리 섹션 3개, 최신 글 목록, 4열 푸터(운영자·면책조항·사이트맵·RSS) |
| P2 필수 페이지·신뢰 신호 | 완료 | 면책조항 신설, 개인정보 방침 현행화(§3 AdSense·보호책임자), 소개·문의 강화, 글 페이지 FAQ·참고 자료·함께 보면 좋은 글 |
| P3 기존 8개 보강 | 완료 | 전부 한글 2,200자 이상, `updatedAt` 2026-09-11 |
| P3 신규 12개 | 4개 발행 · 8개 초안 | 발행: 공과금 고지서, 스미싱, KTX·SRT 예매, 숙소 취소 규정. 초안 8개는 `src/content/drafts/`에서 검수 후 주 3~4개씩 발행 |
| P4 기술 SEO | 완료 | OG 기본 이미지, BlogPosting·Breadcrumb·FAQ·CollectionPage JSON-LD, RSS, sitemap lastModified 계산, manifest 아이콘, 404·error 페이지, `next/script` 로더 |
| P5 운영 | 사용자 수행 | Vercel 환경변수 → 서치콘솔 → 색인 요청 → 발행 완료 후 심사 신청 (아래 P5 참고) |

**다음 할 일(사용자)**: ① Vercel에 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 설정 ② 서치콘솔 사이트맵 제출과 글 22개 URL 색인 요청 ③ 초안 8개를 README의 발행 절차대로 주 3~4개씩 검수·발행 ④ 발행 완료·색인 확인 후 애드센스 심사 신청. 발행 글은 `pnpm lint`(콘텐츠 검사 포함)와 `pnpm build`를 통과해야 한다.

## Context

- 오늘 승인된 참고 도메인 2곳(powerblog.net, wawaedu.co.kr)의 공통점은 **좁고 명확한 주제, 메인에서 바로 보이는 카테고리 구조, 필수 페이지·색인 세팅 완비**다. wawaedu.co.kr(원비히어)은 "학원비·학교 정보" 단일 주제로 지역→구→학교/과목 계층 구조와 `/guide/` 실용 가이드를 결합했고, 세팅 2~3주 후 신청해 2~3일 만에 승인됐다. powerblog.net은 티스토리 자동 발행 서비스 랜딩+블로그 형태다. (두 도메인은 이 환경의 네트워크 정책으로 직접 접속이 차단되어 검색 결과로만 확인함.)
- 2026년 승인 트렌드(구글 공식 자격요건 + 국내 후기 종합): 글 개수보다 **① 독창적이고 깊이 있는 글 ② 소개·문의·개인정보처리방침(·이용약관·면책조항) ③ 카테고리마다 실제 글이 채워진 구조 ④ 서치콘솔 색인**. 가장 흔한 거절 사유는 "가치가 별로 없는 콘텐츠"이며, 템플릿처럼 같은 구조의 짧은 글, 빈 카테고리, 운영자 정체 불명, 검수 없는 AI 글이 주요 원인이다.
- 알고가요 현재 상태 (코드 전수 조사):
  - 글 **8개**(생활비 3 · 디지털 3 · 여행 2), 전부 한글 1,134~1,282자. 8개가 **동일 템플릿**(요약 2단락 · 섹션 4개 · 체크리스트 · 마무리). `readingTime` "5~8분"은 실제(약 2분)와 불일치. 이미지 3장을 8개 글이 돌려쓰며 각 2.0~2.5MB.
  - 메인(`src/app/page.tsx`): 히어로 + 대표글 + 최신글 6개 + "알고가요의 기준" 블록. **카테고리별 섹션 없음**. 글 페이지 관련 글은 "같은 주제의 글" 최대 2개.
  - 필수 페이지: 소개·문의·개인정보처리방침·이용약관 있음. **면책조항 없음**. 개인정보처리방침 §3이 "향후 AdSense를 도입하는 경우"인데 실제로는 `layout.tsx`가 AdSense 로더를 전 페이지에 로드 중(불일치). 운영자 필명·이메일이 푸터에 없음.
  - 기술 SEO: sitemap/robots/ads.txt/Article·WebSite JSON-LD 있음. **OG 이미지 없음, BreadcrumbList·publisher.logo 없음, RSS 없음, 서치콘솔 토큰이 `.env.example`에서 비어 있음**. `layout.tsx`의 전역 `alternates.canonical: "/"`는 자체 canonical이 없는 페이지에 홈 canonical을 상속시키는 구조적 위험. sitemap 정적 페이지 lastModified "2026-09-05" 하드코딩.
  - 환경: Next.js 16.3.4(App Router), pnpm 11, Node 22. `node_modules` 미설치. Playwright + Chromium(`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) 있음. cwebp/ImageMagick 없음(래스터 처리는 `sharp` 필요).
- 사용자 결정: **(1)** 기존 8개를 한글 2,000자 이상으로 보강 + 신규 12개(카테고리별 4개) 초안 → 총 20개, **(2)** 운영자는 필명 + 이메일, **(3)** MDX 전환 없이 TS 구조 유지 + 링크 필드 추가.

## 갭 분석

| 항목 | 승인 사이트/기준 | 알고가요 현재 | 조치 |
|---|---|---|---|
| 주제 집중 | 단일·명확 | 3개 주제, "생활 실용 가이드"로 묶임 | 카테고리 추가 금지, 카테고리 소개문·글 수 확충 |
| 카테고리 노출 | 메인에서 카테고리+글 여러 개 | 헤더 메뉴만 | 메인에 카테고리별 섹션(각 3개 글) |
| 글 수/깊이 | 카테고리당 5개+, 2,000자+ | 2~3개, 1,200자 | 카테고리당 6~7개, 2,000자+, 구조 다양화 |
| 필수 페이지 | 소개·문의·개인정보·약관·면책 | 면책 없음, 방침 불일치 | 면책조항 신설, 방침 현행화, 소개 강화 |
| 운영자 신뢰 | 운영자명·이메일 노출 | "편집팀"만 | 필명·이메일을 푸터·소개·글 하단에 일관 표기 |
| 색인 | 서치콘솔 등록·사이트맵 | 토큰 미설정 | Vercel 환경변수 + 색인 요청(운영) |
| 공유/리치결과 | OG 이미지, 구조화 데이터 | 없음/부분 | OG 기본 이미지, BlogPosting·Breadcrumb·FAQ |

## 구현 계획

순서: **P0 기반 → P1 구조 → P2 필수 페이지 → P3 콘텐츠(작업량 대부분) → P4 기술 SEO → P5 운영(코드 외)**. P0·P1·P2·P4는 글 8개 상태에서 빌드 통과까지 한 PR로, P3는 3~4개 글 단위 PR로 나눈다.

> **Next.js 16 사전 확인(AGENTS.md)**: `pnpm install` 후 `node_modules/next/dist/docs/`에서 다음을 읽고 작성한다 — Metadata 객체(`openGraph.images`, `twitter`, `verification.other`, `alternates.types`, `keywords`), 파일 규칙(`sitemap`, `robots`, `manifest` icons 타입, `not-found`의 metadata export 가능 여부, `error`는 client), Route Handlers + `dynamic = "force-static"`, `next/script` 전략, `next/image`(Next 16의 `images.qualities`, SVG 소스 제한), `PageProps`/`LayoutProps` 타입.

### P0. 콘텐츠 모델·헬퍼 (기반)

**신규 `src/lib/content-types.ts`** — 타입 단일화:
- `ContentLink { label, href, external?, note? }`, `ContentTable { caption?, columns, rows }`, `FaqItem { q, a }`
- `ContentSection { id?, heading, paragraphs, bullets?, steps?(ol), table?, note?, links? }` — 제목 번호 파싱 제거(`heading.split(".")` 의존 삭제), 앵커는 `id ?? section-${i+1}`
- `PostContent { summary, sections, faq?, references?, checklist?(optional로 변경), closing }`
- `PostMeta { slug, title, description, category, categoryLabel, publishedAt, updatedAt?, image, imageAlt, tags?, related?(수동 지정 slug) }` — `readingTime` 제거(파생값). `Post = PostMeta & { readingTime }`.

**글 파일 분리(TS 유지)**: `src/content/posts/<slug>.ts`가 `meta: PostMeta`, `content: PostContent` export. `src/content/index.ts`가 `entries` 배열로 모음. 기존 8개는 `posts.ts`/`post-content.ts`에서 기계적으로 잘라 이동(20개가 되면 단일 파일 2,500줄이 되므로 분리). `src/lib/post-content.ts` 삭제.

**`src/lib/posts.ts` 재작성**: `entries`에서 `posts`(publishedAt 내림차순 정렬 + `readingTime` 주입)와 `postContent` 맵을 만들고, 중복 slug 시 빌드 에러. 헬퍼: `getPostBySlug`, `getLatestPosts(limit, exclude?)`, `getPostsByCategory(slug, limit?)`, `getRelatedPosts(post, limit=3)`(수동 related → 같은 카테고리 → 다른 카테고리 순, 자기 제외), `getLatestUpdateDate()`, `categorySlugs`, `isCategorySlug`. `categoryInfo`에 `longDescription`(300자 내외) 추가.

**신규 `src/lib/reading-time.ts`**: 본문 전 필드의 `[가-힣A-Za-z0-9]` 수 / 500자 → `max(2, ceil)`분. **신규 `src/lib/format.ts`**: `formatDate`(글 페이지에서 이동), `toRfc822`(RSS).

**`src/lib/site.ts`**: `siteAuthor { name: "알고가요 편집장", role, email, url: /about, id: /about#author, since: "2026-07", bio }`, `legalEffectiveDate`(방침·약관·면책 시행일 단일 관리), `navigation`에 `{ href: "/contact", label: "문의" }` 추가. 코드 내 "알고가요 편집팀" 문자열(글 페이지 4곳, 소개 1곳)을 `siteAuthor.name`으로 치환.

인라인 사용처 교체: `page.tsx:7,46`, `category/[slug]/page.tsx:9-11,37`, `articles/[slug]/page.tsx:18,51,54,44-46`, `articles/page.tsx:25`, `sitemap.ts`.

### P1. 메인 화면·탐색 구조

**`src/app/page.tsx`**: `export const metadata = { alternates: { canonical: "/" } }` 추가(전역 canonical은 layout에서 제거). 구성:
1. 히어로 + 대표글(`posts[0]`) — 유지
2. "새로 올라온 글" — 카드 대신 **텍스트 목록**(`<ol className="latest-list">`, 날짜·카테고리·제목, `getLatestPosts(5, [featured])`) → 페이지가 카드 15개 나열로 보이지 않게
3. **카테고리 섹션 ×3** — 신규 `src/components/category-section.tsx` (`CategorySection({ slug, alt })`): `.section-heading`(kicker CATEGORY, h2 카테고리명, 설명, 우측 "카테고리 전체 보기 →") + `.card-grid`에 `getPostsByCategory(slug, 3)` → 기존 `ArticleCard` 재사용. 홀수 섹션 배경 `var(--paper-deep)`
4. "알고가요의 기준" 블록 유지

CSS(`globals.css`): `.category-section`, `.category-section.alt`, `.latest-list`(grid 110px auto 1fr, 행 구분선), 680px 이하 1열 규칙.

**`src/components/site-footer.tsx`** — 4열(`1.6fr repeat(3,1fr)`; 980px 이하 3열+브랜드 전폭, 680px 이하 기존 2열 규칙 유지):
1. 브랜드 + 소개 + **"운영·편집: 알고가요 편집장 · contact@algogayo.com(mailto)"**
2. 카테고리: `categorySlugs.map` → 생활비/디지털/여행
3. 둘러보기: 전체 글 / 사이트 소개 / 문의하기 / RSS(`/feed.xml`)
4. 안내: 개인정보처리방침 / 이용약관 / **면책조항** / 사이트맵(`/sitemap.xml`)
하단: © + "본 사이트는 Google AdSense 광고를 게재합니다".

**`src/app/category/[slug]/page.tsx`**: `longDescription`, "글 N개", 하단 "다른 카테고리" 칩 2개, BreadcrumbList + CollectionPage JSON-LD, `twitter` 메타. **`src/app/articles/page.tsx`**: 상단 카테고리 칩 행 추가.

### P2. 필수 페이지·신뢰 신호

- **신규 `src/app/disclaimer/page.tsx`(면책조항)**: `privacy/page.tsx` 골격(`shell legal-page`, `page-intro compact`, `legal-summary`) 복제, canonical `/disclaimer`. 섹션: 정보 제공 목적 / 전문 자문 아님(법률·의료·세무·금융) / 정확성·최신성 한계와 업데이트 표기 / 외부 링크 / **광고 고지(Google AdSense 게재 중, 광고와 편집 분리, 광고 내용은 광고주 책임)** / 책임 제한 / 문의. 1,200자 이상.
- **`src/app/privacy/page.tsx`**: 시행일 → `legalEffectiveDate`(이전 시행일 병기). §3 현재형으로 재작성 — "알고가요는 Google AdSense를 통해 광고를 게재합니다. Google을 포함한 제3자 광고 공급업체는 쿠키(DoubleClick DART 쿠키 등)를 사용해 …" + Google 광고 및 개인정보 보호(policies.google.com/technologies/ads), Google 광고 설정, 제3자 공급업체 옵트아웃(aboutads.info/choices) 링크. §4 현재형. **신설 "개인정보 보호책임자"**(필명·이메일·역할). 문의 섹션에 면책조항 링크.
- **`src/app/terms/page.tsx`**: 시행일 통일, §6 현재형("광고가 게재됩니다") + 면책조항 링크.
- **`src/app/about/page.tsx`**(1,500자+): "운영자 소개"(신규 `src/components/author-box.tsx` 공용, `id="author"`; 필명·역할·운영 시작 2026년 7월·이유·이메일), "콘텐츠 제작·검수 과정"(`.principle-list` 재사용: 주제 선정 → 공식 자료 확인·출처 표기 → 직접 실행 후 초안 → 검수·업데이트 표기), "광고와 수익 안내"(면책·방침 링크). Organization + Person JSON-LD.
- **`src/app/contact/page.tsx`**: 운영자 필명, "회신 이메일 필수" 안내, 개인정보처리방침 링크, 문의 유형에 "광고·제휴" 추가, 짧은 FAQ 2~3개. mailto 유지(폼 백엔드 없음).
- **`src/app/articles/[slug]/page.tsx`**:
  - `generateMetadata`: `authors`(필명), `keywords: tags`, `openGraph.images: [post.image]`, `twitter: summary_large_image`
  - 헤더: `<time>` 사용, `updatedAt` 있으면 "YYYY년 M월 D일 업데이트", `tags`는 링크 없는 `<ul className="tag-list">`(태그 페이지 만들지 않음)
  - 섹션 렌더 순서: paragraphs → steps(`<ol className="steps">`) → bullets → table(`.table-wrap > .content-table`) → note → links(`.section-links`, 내부는 `Link`, 외부는 `target=_blank rel=noopener noreferrer`)
  - 섹션 뒤: FAQ(`#faq`, h3/p 정적), 참고 자료(`#references`), 체크리스트(있을 때만), 마무리, `AuthorBox`
  - 목차 항목에 FAQ/참고 자료/체크리스트 추가, 앵커 `section-${i+1}`
  - 관련 글: `getRelatedPosts(post, 3)` + 제목 **"함께 보면 좋은 글"**, `.card-grid`
  - JSON-LD: BlogPosting + BreadcrumbList + (faq 있으면) FAQPage
  - CSS: `.steps`, `.table-wrap`, `.content-table`, `.section-links`, `.faq-box`, `.faq-item`, `.references-box`, `.tag-list`, 680px 표 폰트 축소

### P3. 콘텐츠 보강·신규 글 (핵심)

**공통 규칙**: 전부 자체 작성 원문, 한글 2,000자 이상(목표 2,100~2,500), 요약 2~3단락, 구체 숫자 예시 1개+, 공식 출처 `references` 2개+(소비자24, 한국소비자원 참가격, 금융감독원 파인, 스마트초이스, 식품안전나라, 기상청, 코레일/SR, KISA 118, 개인정보보호위원회 등), 본문 `links`에 다른 글로 가는 내부 링크 1개+, `tags` 3~5개. **섹션 수 3~6개 / 제목 번호 유·무 / steps·table·bullets 조합 / FAQ 3~4개 / 체크리스트 유·무를 글마다 다르게** 배치해 20개가 한 템플릿으로 보이지 않게 한다. **AI 초안은 반드시 사용자가 검수·수정 후 발행**.

**기존 8개 보강**(각 +800~1,000자, `updatedAt` 설정, 예시):
- `grocery-unit-price`(가장 짧음): 단위가격 표시제 의무 섹션 + 100g/100ml당 계산 예시 5건 표 + 3단계 steps + FAQ 4
- `fixed-expense-review`: 월 186만 원 가계 점검표 before/after 표, 통신비 선택약정 25%·알뜰폰 비교, FAQ 4
- `weekly-meal-plan-without-waste`: 2인 가구 주간 식단·예산 예시 표, FAQ(1인 가구/냉동실/배달 병행)
- `photo-backup-three-step`: 3-2-1 원칙 숫자 계산(2만 장×3MB=60GB → 저장소 비교표), 체크리스트 제거·FAQ로 마무리
- `smartphone-notification-reset`: iOS/Android 설정 경로 steps ×2, 집중 모드 예약 예시, 제목 번호 제거
- `weekend-trip-light-packing`: 계절별 추가/제외 표, 무게 계산 예시
- `rainy-day-travel-plan`: 강릉 1박 2일 플랜 A/B 표, 예약 취소 규정 확인 steps
- `password-manager-start`: 복구 키트 steps, 유출 의심 시 순서, 체크리스트 제거

**신규 12개**(slug / 제목 초안, 확정 시 조정):
- 생활비: `utility-bill-monthly-check` 전기·가스·수도 고지서에서 꼭 볼 세 줄과 줄이는 순서 / `subscription-audit-cancel-order` 구독 서비스 정리: 결제일·환불 규정과 3단계 점검 / `refund-exchange-online-shopping` 온라인 쇼핑 환불·교환, 7일 청약철회부터 요청 순서까지 / `emergency-fund-three-months` 비상금 통장, 3개월 생활비 만드는 현실적인 단계
- 디지털: `phishing-sms-check` 낯선 문자 링크 누르기 전 30초 확인법: 스미싱 판별과 신고 / `old-phone-reset-before-selling` 쓰던 스마트폰 넘기기 전 꼭 할 6가지 / `cloud-storage-cleanup` 클라우드 저장 공간이 꽉 찼을 때: 유료 전환 전 30분 정리 / `family-shared-calendar-setup` 가족 공용 캘린더 만들기
- 여행: `domestic-train-booking-tips` KTX·SRT 예매 오픈 시점과 취소 수수료 정리 / `accommodation-cancellation-check` 숙소 예약 취소·환불 규정 읽는 법 / `first-overseas-trip-documents` 첫 해외여행 서류 준비: 여권·전자여행허가·여행자보험 / `car-trip-with-kids-rest-stops` 아이와 자동차 여행: 휴게소 간격과 이동 시간 계획
→ 최종 생활비 7 · 디지털 7 · 여행 6.

**발행 정책(백데이트 금지)**: 신규 글은 `src/content/drafts/`에 초안으로 두고(index에 미포함), **주 3~4개씩 약 3주에 걸쳐 `src/content/posts/`로 옮기며 `publishedAt`을 실제 배포일**로 기록한다. 참고 사례의 "세팅 2~3주 후 신청"과 같은 리듬이며, 사이트가 한 번에 만들어진 것으로 보이지 않게 한다. (한 번에 모두 발행하려면 같은 날짜로 올리면 됨 — 사용자 선택.) 이 세션에서는 1차분(3~4개)까지 발행 상태로 만든다.

**이미지(20장 고유)**: `public/images/posts/<slug>.webp` 1600×900, 200KB 이하. `scripts/optimize-images.mjs`(`pnpm add -D sharp`)로 원본 PNG → WebP 변환, 동시에 `public/logo.png`(512), `icon-192/512.png`, `public/og-default.png`(1200×630) 생성. 일러스트를 외부에서 만들기 전 임시로 `scripts/render-covers.mjs`(전역 Playwright + Chromium으로 카테고리 색·제목 텍스트 카드를 HTML로 렌더→스크린샷)로 글별 고유 커버를 생성해 이미지 중복을 즉시 해소. SVG는 `next/image` 소스로 쓰지 않음.

### P4. 기술 SEO·색인

- **`src/app/layout.tsx`**: 전역 `alternates.canonical` 제거, `openGraph.images`/`twitter.images`에 `/og-default.png`, `twitter.card: summary_large_image`, `alternates.types["application/rss+xml"]: /feed.xml`, `authors`(필명), `verification.other["naver-site-verification"]`(`NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 있을 때). AdSense 로더는 `next/script`(`afterInteractive`, body 내)로 전환 — 소유권은 `google-adsense-account` 메타+ads.txt로 이미 증명되므로 위험 없음, AdSense 콘솔이 "코드 없음"을 보고하면 `beforeInteractive`로 변경. 인라인 JSON-LD → `JsonLd` 컴포넌트. `<head>` 직접 작성 제거.
- **신규 `src/components/json-ld.tsx`**(`JsonLd({ data })`, `<` 이스케이프 유지) + **`src/lib/structured-data.ts`**: `buildOrganizationJsonLd`(`@id`, `logo` ImageObject `/logo.png`), `buildWebSiteJsonLd`, `buildPersonJsonLd`(필명), `buildArticleJsonLd`(BlogPosting, author Person, publisher.logo, keywords, wordCount), `buildBreadcrumbJsonLd`, `buildFaqJsonLd`, `buildCollectionPageJsonLd`.
- **OG 이미지**: 동적 `opengraph-image`(ImageResponse)는 한글 폰트 번들이 필요해 제외. 정적 `public/og-default.png` + 글은 `post.image`.
- **`src/app/sitemap.ts`**: `posts` 정렬본 사용, `/`·`/articles` lastModified = `getLatestUpdateDate()`, 카테고리 = 해당 카테고리 최신 글, `/privacy`·`/terms`·`/disclaimer` = `legalEffectiveDate`, `/disclaimer` 추가. URL 수 = 정적 7 + 카테고리 3 + 글 N.
- **신규 `src/app/feed.xml/route.ts`**: RSS 2.0, `dynamic = "force-static"`, `Content-Type: application/rss+xml; charset=utf-8`.
- **`src/app/manifest.ts`** `icons`(svg any + png 192/512). **`src/app/not-found.tsx`** `robots: noindex` + 최신 글 3개·카테고리 칩. **신규 `src/app/error.tsx`**(`"use client"`, `.not-found` 레이아웃 재사용, 다시 시도 버튼).
- `.env.example`·`README.md`에 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`, (선택) `NEXT_PUBLIC_GA_MEASUREMENT_ID`, 콘텐츠 파일 구조·검사 스크립트 문서화.

### P5. 운영 체크리스트 (코드 외, 사용자 수행)

1. Vercel 환경변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 설정 → 서치콘솔 도메인 속성 확인(DNS TXT 권장) → `sitemap.xml` 제출.
2. 글 발행마다 "URL 검사 → 색인 생성 요청". 3~5일 후 색인 보고서에서 글·카테고리·필수 페이지 전체 색인 확인.
3. (선택) 네이버 서치어드바이저 등록 + 사이트맵·RSS 제출, GA4.
4. Cloudflare 프록시 사용 시 Googlebot/Mediapartners-Google 차단(Bot Fight Mode) 해제 확인.
5. 12개 신규 글 발행 완료 + 색인 확인 후 **애드센스 심사 신청**. 신청 전 점검: 모바일에서 메인·글·푸터 정상, 모든 카테고리 5개+ 글, 4개 법적 페이지 링크가 푸터에 있음, `ads.txt` 200, 빈 페이지 없음, AdSense 사이트 URL이 `algogayo.com`(www 없음)과 일치.
6. 승인 전 광고 단위(`<ins class="adsbygoogle">`) 삽입 금지(로더만 유지). 승인 후에도 주 1개 발행 지속.

## 검증

- **정적 검사**: 신규 `scripts/check-content.mjs`(`src/content/posts/*.ts` 정규식 검사: 한글 2,000자 이상, 파일명=slug, 날짜 ≤ 오늘, 이미지 파일 존재, references 2개+, slug 중복 없음)를 `pnpm lint`에 연결.
- `pnpm install && pnpm lint && pnpm build` 통과(`--webpack`; `/articles/[slug]` N개, `/feed.xml`, `/disclaimer` 모두 SSG).
- `pnpm start` 후:
  - `curl -s localhost:3000/sitemap.xml | grep -c "<loc>"` = 10 + 글 수
  - `/robots.txt`, `/ads.txt`, `/feed.xml`(content-type rss+xml), `/disclaimer`, `/og-default.png` 모두 200
  - `/` HTML에 `category-section` 3개, canonical이 정확히 `https://algogayo.com`
  - `/articles/<slug>`에 `"BlogPosting"`, `"BreadcrumbList"`, (faq 글) `"FAQPage"`, `og:image` 존재; 모든 페이지 JSON-LD `JSON.parse` 성공(node 스크립트)
- Playwright + Chromium(`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`)으로 1280px·390px 스크린샷: 메인 카테고리 섹션·푸터 4열·글 페이지 표/FAQ 레이아웃 확인. `pnpm dlx lighthouse`(headless) SEO·접근성 90+ 목표.
- 배포 후 Google 리치 결과 테스트(BlogPosting/Breadcrumb/FAQ), 서치콘솔 색인 상태, AdSense 콘솔 `ads.txt` 상태 "승인됨" 확인.

## 주의·리스크

- 전역 canonical 제거 후 **모든 페이지가 자체 `alternates.canonical`을 정의**해야 함(신규 disclaimer 포함).
- `posts`는 모든 글 파일을 import하므로 **클라이언트 컴포넌트에서 import 금지**.
- Next 16에서 `next/image`의 `quality` prop은 `images.qualities` 설정 없이 쓰지 않음.
- FAQ·참고 자료는 실제로 유용한 문장이어야 함 — 키워드 채우기식 블록은 오히려 저가치 판정 요인.
- 요금·수수료·제도 수치는 공식 출처 확인 날짜를 본문에 적고 `updatedAt`으로 갱신 이력을 남김.
