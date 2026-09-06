# 작업 인수인계 (2026-09-06)

새 채팅에서 이어서 작업할 때 이 문서를 먼저 읽습니다. 전체 계획과 근거는 `docs/plan.md`, 글 작성법은 `docs/writing-guide.md`, 이미지 프롬프트는 `docs/image-prompts.md`에 있습니다.

## 1. 목표와 상황

- 사이트: 알고가요 (algogayo.com), Next.js 16 App Router + React 19 + TypeScript + pnpm 11, Vercel 배포, Cloudflare DNS.
- **1순위는 Google AdSense 승인.** 현재 승인 신청 대기 상태였고, 사용자는 신청을 취소한 뒤 재구축 완료 후 재신청할 예정.
- 브랜치 `claude/adsense-site-plan-rjqm5f`에 커밋 3개가 푸시되어 있음. **`main`은 손대지 않았고 PR도 만들지 않았음.** 사용자가 로컬에서 확인한 뒤 `main`에 머지하면 그때 실제 배포됨.
- 사용자 환경: macOS, VS Code. Node/pnpm 설치와 클론 방법은 마지막 대화에서 안내함(`npm install -g pnpm@11.19.0`, `git clone -b claude/adsense-site-plan-rjqm5f … .`).

## 2. 완료한 것

| 영역 | 내용 |
| --- | --- |
| 콘텐츠 | 글 본문을 `content/posts/*.md`(frontmatter)로 이전. 로더(`src/lib/posts.ts`)가 필수 필드·날짜·이미지 존재·본문 길이를 검증하고 실패 시 빌드 중단. `draft: true`는 개발 서버에서만 표시 |
| 글 | 기존 8편(공개, 각 1,700~1,850자, 섹션 하나씩 추가하고 `updatedAt: 2026-09-06`) + 신규 12편(`draft: true`, 각 1,900~2,200자, 카테고리별 4편) = 총 20편 |
| 레이아웃 | Tailwind 제거 + 명시적 리셋, 팔레트(크림·네이비·코랄) 유지, 제목만 Noto Serif KR(`next/font/google`, preload false), 본문 시스템 폰트. 콘텐츠 우선 홈, 카테고리 레일, 햄버거 메뉴(Escape·포커스 복귀·라우트 이동 시 닫힘), 글 페이지(목차·요약·번호 섹션·체크리스트·작성자 박스·이전/다음·관련 글) |
| 정책 | 개인정보처리방침 15개 조항(개인정보보호법 30조 + Google AdSense 쿠키 고지 + 보호책임자 + 권익침해 구제), 약관에 광고·수익 조항과 준거법, 소개 페이지에 운영자·편집 원칙·이미지 정책·광고 게재 고지 |
| SEO | 글별 `og:image`(대표 이미지), 기본 OG PNG(`src/app/opengraph-image.png`, `pnpm og`로 재생성), JSON-LD(WebSite, Article+Person, BreadcrumbList, Person), RSS `/feed.xml`, 사이트맵 날짜를 콘텐츠에서 파생, 네이버 확인 메타 자리, `dynamicParams=false` |
| 도구 | `pnpm images`(원본 → 1600×900 JPG), `pnpm og`, `pnpm typecheck`(`next typegen && tsc --noEmit`), `--webpack` 플래그 제거(Turbopack 빌드 확인) |
| 운영자 | 필명 = 사이트명 `알고가요`, 역할 `운영자`, bio 없음, 이메일 `contact@algogayo.com` (`src/lib/site.ts`) |

검증 완료: lint·typecheck·build 통과, 전 라우트 200/404, JSON-LD·RSS·사이트맵 파싱, 모바일 에뮬레이션에서 가로 오버플로 없음, 햄버거 메뉴 동작, 데스크톱·모바일 스크린샷 육안 확인.

## 3. 남은 일

### 사용자가 할 일
1. 로컬에서 브랜치 확인 → `main` 머지 → Vercel 배포.
2. 이미지 20장 생성(`docs/image-prompts.md`) → `assets/images-src/posts/<slug>.png` → `pnpm images` → 각 글 frontmatter에 `image: /images/posts/<slug>.jpg`. 없으면 기존 일러스트 3장이 카테고리 폴백으로 쓰임.
3. 신규 12편 초안 검토(본인 경험·구체 정보 한두 곳 추가) → 3~4편씩 `draft: false` + 실제 `publishedAt`으로 바꿔 열흘 안에 배포.
4. Vercel 환경 변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`. Search Console·네이버 서치어드바이저·다음에 사이트맵과 RSS 제출.
5. Cloudflare: 프록시(주황 구름)면 DNS-only 권장. 유지 시 Bot Fight Mode·Rocket Loader·Email Obfuscation 끄기. Email Routing으로 `contact@algogayo.com` 수신 테스트.
6. 20편 색인 확인 후 AdSense 재신청. 체크리스트는 `docs/plan.md` §8.

### 승인 후 코드 작업 (아직 안 함)
- `src/components/ad-slot.tsx`(client): `<ins class="adsbygoogle" style="display:block" data-ad-client data-ad-slot data-ad-format="auto" data-full-width-responsive="true">`, `useEffect`에서 `data-adsbygoogle-status` 없을 때만 `(window.adsbygoogle ||= []).push({})`, 컴포넌트 key = pathname, `min-height: 280px` 예약, 슬롯 id 비면 null, 개발 모드 점선 플레이스홀더.
- `src/lib/ads.ts`에 슬롯 id 3개 상수. 배치: 글 본문 2번째 섹션 뒤(섹션 ≥ 3일 때, `src/components/article-body.tsx`에서 섹션 사이에 삽입), 마무리 아래, 데스크톱 sticky 사이드바(`src/app/articles/[slug]/page.tsx`의 `.article__layout`을 3열로). 개인정보·약관·문의·소개·404에는 없음.
- AdSense 대시보드: Auto ads는 앵커만, URL 제외 `/privacy` `/terms` `/contact` `/about`, GDPR(EEA/UK) 메시지 게시.

### 선택 사항
- CI(`.github/workflows/ci.yml`: lint → typecheck → build)는 연기함.
- 카테고리 폴백 이미지 교체 시 `assets/images-src/categories/<slug>.png` → `pnpm images` → `src/lib/categories.ts`의 `fallbackImage`를 `/images/categories/<slug>.jpg`로 변경.

## 4. 파일 지도

```
content/posts/*.md            글 20편
docs/                         plan.md(전체 계획·프롬프트·체크리스트), writing-guide.md, image-prompts.md, handoff.md
scripts/                      optimize-images.mjs, make-og.mjs
src/app/layout.tsx            폰트, 메타데이터, RSS link, AdSense head 스크립트(원시 <script async>, React 19가 head로 호이스팅), WebSite JSON-LD
src/app/page.tsx              홈
src/app/articles/             목록, [slug] 글 페이지(dynamicParams=false)
src/app/category/[slug]/      카테고리
src/app/{about,contact,privacy,terms}/  정책·소개
src/app/feed.xml/route.ts     RSS (force-static)
src/app/sitemap.ts robots.ts manifest.ts not-found.tsx opengraph-image.png
src/components/               site-header, site-nav(client), site-footer, article-card, category-rail, article-toc, article-body, author-box, post-nav, breadcrumb, page-head, json-ld
src/lib/site.ts               이름·URL·author·adsense.client·verification·navigation
src/lib/categories.ts         카테고리 3개 + 폴백 이미지
src/lib/posts.ts              로더·검증·정렬·인접글·관련글
src/lib/markdown.ts           unified 파이프라인, h2 → section-n id, hast를 h2 경계로 분리, TOC, 글자 수
src/lib/seo.ts                JSON-LD 빌더
src/lib/legal.ts              시행일·개정 이력·formatDate(Asia/Seoul)
src/app/globals.css           토큰·리셋·전체 스타일 (BEM식 클래스)
```

## 5. 명령어

```bash
pnpm install
pnpm dev          # 초안 포함
pnpm build        # 콘텐츠 검증 + 초안 제외
pnpm start
pnpm lint
pnpm typecheck
pnpm images       # assets/images-src → public/images
pnpm og           # 기본 OG PNG 재생성
```

## 6. 작업 중 알게 된 것 (다음 세션 주의)

- **Next 16 문서는 `node_modules/next/dist/docs/`에서 확인**(AGENTS.md 지시). 이번에 확인한 것: `dynamicParams`, `next typegen`(typecheck 순서), `next/font/google`은 `subsets`에 `korean`을 못 넣음(`["latin"]`으로 두어도 한글 조각은 CSS에 포함됨), `images.qualities` 기본 `[75]`, route handler `force-static`, 404에 noindex 자동.
- `metadata.alternates`는 페이지별 `alternates.canonical`이 통째로 덮어써서 RSS link는 `layout.tsx` head에 직접 둠.
- `Intl.DateTimeFormat`에 `timeZone: "Asia/Seoul"`이 없으면 Vercel(UTC)에서 날짜가 하루 앞서 보임(수정 완료).
- 마크다운 frontmatter의 날짜는 YAML이 Date로 파싱하므로 로더가 문자열로 정규화함.
- 존재하는 글은 `description` 40~160자, 본문 900자 이상(공백 제외) 규칙. 기준을 바꾸려면 `src/lib/posts.ts` 상단 상수.
- 샌드박스 환경 한정: 빌드 시 `NODE_USE_ENV_PROXY=1` 필요, 외부 사이트 접속 불가, 서버 종료는 `pgrep -f "next-serve[r]"` 형태로(패턴이 자기 셸에 매치되는 것 방지). 사용자 로컬에서는 해당 없음.
- 기존 8편의 `publishedAt`은 사이트 생성 이전 날짜지만 그대로 두었고 `updatedAt`만 기록함. 신규 글은 실제 게시일을 쓸 것.
- `assets/images-src/`는 gitignore. 변환본 `public/images/**`만 커밋.

## 7. 새 채팅 시작 문구 예시

> 저장소 `docs/handoff.md`를 읽고 이어서 작업해 줘. 브랜치 `claude/adsense-site-plan-rjqm5f`. 이번에 할 일: (예) 이미지 넣기 / 초안 3편 게시 / 승인 후 광고 슬롯 추가.
