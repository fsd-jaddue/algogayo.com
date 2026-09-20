# 작업 인수인계 (2026-09-07)

새 채팅에서 이어서 작업할 때 이 문서를 먼저 읽습니다. 전체 계획과 근거는 `docs/plan.md`, 글 작성법은 `docs/writing-guide.md`, 이미지 프롬프트는 `docs/image-prompts.md`에 있습니다.

## 1. 목표와 상황

- 사이트: 알고가요 (algogayo.com), Next.js 16 App Router + React 19 + TypeScript + pnpm 11, Vercel 배포, Cloudflare DNS.
- **1순위는 Google AdSense 승인.** 사용자는 기존 신청을 취소한 뒤 재구축 완료 후 재신청할 예정.
- 브랜치 `claude/adsense-site-plan-rjqm5f`에 모든 작업이 푸시되어 있음. **`main`은 손대지 않았고 PR도 만들지 않았음.** 사용자가 로컬(또는 Vercel Preview)에서 확인한 뒤 `main`에 머지하면 그때 실제 배포됨.
- 저장소는 GitHub **public**. `docs/` 안의 전략 메모(plan.md, 이 문서)도 공개된다는 점을 사용자가 알고 있어야 함(§3 참고).
- 사용자 환경: macOS, VS Code. Node/pnpm 설치와 클론 방법은 `README.md` 참고.

## 2. 완료한 것

### 1차 (2026-09-06) 재구축

| 영역 | 내용 |
| --- | --- |
| 콘텐츠 | 글 본문을 `content/posts/*.md`(frontmatter)로 이전. 로더(`src/lib/posts.ts`)가 필수 필드·날짜·이미지 존재·본문 길이를 검증하고 실패 시 빌드 중단. `draft: true`는 개발 서버에서만 표시 |
| 글 | 기존 8편(각 1,700~1,850자, 섹션 하나씩 추가하고 `updatedAt: 2026-09-06`) + 신규 12편(각 1,900~2,200자, 카테고리별 4편) = 총 20편 |
| 레이아웃 | Tailwind 제거 + 명시적 리셋, 팔레트(크림·네이비·코랄), 제목만 Noto Serif KR(`next/font/google`, preload false), 본문 시스템 폰트. 홈, 카테고리 레일, 햄버거 메뉴, 글 페이지(목차·요약·번호 섹션·체크리스트·작성자 박스·이전/다음·관련 글) |
| 정책 | 개인정보처리방침 15개 조항(개인정보보호법 30조 + AdSense 쿠키 고지 + 보호책임자 + 권익침해 구제), 약관에 광고·수익 조항과 준거법, 소개 페이지에 운영자·편집 원칙·이미지 정책·광고 게재 고지 |
| SEO | 글별 `og:image`, 기본 OG PNG, JSON-LD(WebSite, Article+Person, BreadcrumbList, Person), RSS `/feed.xml`, 사이트맵 날짜를 콘텐츠에서 파생, 네이버 확인 메타 자리, `dynamicParams=false` |
| 운영자 | 필명 = 사이트명 `알고가요`, 역할 `운영자`, bio 없음, 이메일 `contact@algogayo.com` (`src/lib/site.ts`) |

### 2차 (2026-09-07) 머지 전 전체 점검

세 갈래(콘텐츠 / 앱 설정·SEO / 정책·UI 문구)로 감사한 뒤 고친 것:

| 영역 | 내용 |
| --- | --- |
| 초안 공개 | **사용자 결정으로 초안 12편을 모두 공개** (`draft` 제거, `publishedAt: 2026-09-07`). 프로덕션 20편, 카테고리별 7/7/6 |
| 콘텐츠 버그 | `parents-phone-basic-setup`, `smartphone-storage-cleanup`의 `##` 제목에 박혀 있던 `1.`/`순서 1:` 접두 제거(CSS 자동 번호와 겹쳐 "2. 1. …"로 보였음) |
| 이미지 | 폴백 PNG 3장(각 2.0~2.6MB, og:image·사이트맵·RSS에도 그대로 쓰임)을 `pnpm images`로 1600×900 JPG(140~230KB)로 변환해 `public/images/categories/{living,digital,travel}.jpg`로 이동, PNG 삭제. `imageSize()` 분기 제거(모두 1600×900) |
| 아이콘·OG | `pnpm og`가 이제 `opengraph-image.png`, `twitter-image.png`, `apple-icon.png`, `public/icons/icon-{192,512,512-maskable}.png`를 함께 생성. 매니페스트 아이콘 4종, `*.alt.txt`로 `og:image:alt` |
| 개인정보처리방침 | 실제로 없는 "방문 통계" 문구 3곳 삭제(GA4 미도입), 위탁 표에서 Search Console 제거, 수탁자별 보호정책 링크 열 추가, 제6조에 광고 쿠키 예외 문장, 제12조 2단계 인증 문구 삭제(사용자 확인), 제15조·약관 제9조에 "불리하지 않은 변경은 즉시 시행" 추가, 제목을 `제N조`로 통일. 시행일 2026-09-07 + 개정 이력 추가(`src/lib/legal.ts`) |
| 문의 페이지 | "영업일 기준 3~5일" → "확인에 며칠이 걸릴 수 있습니다"(사용자 확인) |
| 구조화 데이터 | 글 BreadcrumbList를 화면과 같은 2항목으로, `wordCount` 제거(글자 수였음), Person `description` → `jobTitle`, publisher.logo를 512px PNG+크기로, 날짜를 `toIsoDateTime()`으로 JSON-LD·OG·RSS 통일(`YYYY-MM-DDT09:00:00+09:00`) |
| 기타 | `robots.ts`의 `Host:`(스킴 포함) 제거, 404 페이지 제목, `next.config.ts`에 `poweredByHeader: false`·nosniff·Referrer-Policy, RSS enclosure `length`를 실제 바이트로, 로더 캐시를 파일 mtime 서명으로 무효화해 `pnpm dev`에서 md 수정 즉시 반영 |

검증 완료(2차): lint·typecheck·build 통과(정적 40페이지), 프로덕션 서버에서 43개 라우트/에셋 200, 없는 URL 404+noindex, 홈·글의 og/twitter 이미지·JSON-LD·adsbygoogle 스크립트·메타, RSS 20건·enclosure 길이, 사이트맵 20글, robots에 Disallow 없음, 매니페스트 아이콘, 정책 문구 변경 반영을 스크립트로 확인. 개발 서버에서 md 수정 → 새로고침 반영 확인. 모바일(390px)·데스크톱(1280px) 스크린샷 육안 확인.

## 3. 남은 일

### 사용자가 배포 전후에 할 일 (코드 밖)
1. **Vercel Preview로 이 브랜치를 먼저 배포**해 pnpm 11.19 + `pnpm-workspace.yaml`의 `allowBuilds` 설치·빌드가 통과하는지 확인 → `main` 머지. 이 브랜치는 Vercel에서 한 번도 빌드된 적이 없음.
2. Vercel 환경 변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`은 **프로덕션 빌드 전에** 넣기. `NEXT_PUBLIC_*`은 빌드 시 인라인되므로 나중에 넣으면 재배포가 필요함.
3. `www.algogayo.com` → `algogayo.com` 리다이렉트 확인(canonical·JSON-LD·사이트맵이 모두 apex).
4. Cloudflare: 프록시(주황 구름)면 DNS-only 권장. 유지 시 Bot Fight Mode·Rocket Loader·Email Obfuscation 끄기.
5. `contact@algogayo.com` 수신 테스트(Email Routing). 정책·문의·푸터가 모두 이 주소를 안내함.
6. AdSense 대시보드에서 게시자 ID가 `ca-pub-9408914409364609`인지 확인(코드·`ads.txt` 일치는 확인됨).
7. 배포 후 확인: view-source에 adsbygoogle 스크립트와 `google-adsense-account` 메타, `/ads.txt` `/robots.txt` `/sitemap.xml` `/feed.xml` `/icon.svg` `/apple-icon.png` 200, 없는 URL에 `noindex`.
8. Search Console·네이버 서치어드바이저·다음에 사이트맵과 RSS 제출.
9. 이미지 20장 생성(`docs/image-prompts.md`) → `assets/images-src/posts/<slug>.png` → `pnpm images` → 각 글 frontmatter에 `image: /images/posts/<slug>.jpg`. 없으면 카테고리 폴백 JPG 3장이 쓰임(20편이 이미지 3장을 공유하는 상태라 §8 체크리스트 "고유 이미지"는 아직 미충족).
10. 신규 12편에 본인 경험·구체 정보 한두 곳 추가 → `updatedAt` 갱신. 기존 8편은 1,700~1,860자로 plan.md의 2,000자 목표에 못 미치지만 이번엔 늘리지 않기로 함.
11. 20편 색인 확인 후 AdSense 재신청. 체크리스트는 `docs/plan.md` §8.
12. 저장소가 public이라 `docs/plan.md`·이 문서의 전략 메모가 공개됨. 비공개로 바꾸거나 그대로 둘지 결정.

### 승인 후 코드 작업 (아직 안 함)
- `src/components/ad-slot.tsx`(client): `<ins class="adsbygoogle" style="display:block" data-ad-client data-ad-slot data-ad-format="auto" data-full-width-responsive="true">`, `useEffect`에서 `data-adsbygoogle-status` 없을 때만 `(window.adsbygoogle ||= []).push({})`, 컴포넌트 key = pathname, `min-height: 280px` 예약, 슬롯 id 비면 null, 개발 모드 점선 플레이스홀더.
- `src/lib/ads.ts`에 슬롯 id 3개 상수. 배치: 글 본문 2번째 섹션 뒤(섹션 ≥ 3일 때, `src/components/article-body.tsx`에서 섹션 사이에 삽입), 마무리 아래, 데스크톱 sticky 사이드바(`src/app/articles/[slug]/page.tsx`의 `.article__layout`을 3열로). 개인정보·약관·문의·소개·404에는 없음. 약관 제7조가 "광고는 본문과 구분되는 위치"라고 약속하므로 시각적으로 구분되게.
- AdSense 대시보드: Auto ads는 앵커만, URL 제외 `/privacy` `/terms` `/contact` `/about`, GDPR(EEA/UK) 메시지 게시.

### 선택 사항
- CI(`.github/workflows/ci.yml`: lint → typecheck → build)는 연기함.
- 글 본문 안 내부 링크가 0개. 글마다 관련 글 2~3개를 본문에서 링크하면 탐색 구조에 도움.
- 20편이 요약 2개·체크리스트 5~6개·알아두세요 1개로 구조가 똑같음. 몇 편은 요약이나 체크리스트를 빼서 변주.

## 4. 파일 지도

```
content/posts/*.md            글 20편 (모두 공개)
docs/                         plan.md(전체 계획·프롬프트·체크리스트), writing-guide.md, image-prompts.md, handoff.md
scripts/                      optimize-images.mjs(pnpm images), make-og.mjs(pnpm og: OG·트위터·apple-icon·매니페스트 아이콘)
src/app/layout.tsx            폰트, 메타데이터, RSS link, AdSense head 스크립트(원시 <script async>), WebSite JSON-LD
src/app/page.tsx              홈
src/app/articles/             목록, [slug] 글 페이지(dynamicParams=false, OG 1600×900 상수)
src/app/category/[slug]/      카테고리
src/app/{about,contact,privacy,terms}/  정책·소개
src/app/feed.xml/route.ts     RSS (force-static, enclosure 실제 길이)
src/app/sitemap.ts robots.ts manifest.ts not-found.tsx
src/app/favicon.ico icon.svg apple-icon.png opengraph-image.png twitter-image.png (+ *.alt.txt)
src/components/               site-header, site-nav(client), site-footer, article-card, category-rail, article-toc, article-body, author-box, post-nav, breadcrumb, page-head, json-ld
src/lib/site.ts               이름·URL·author·adsense.client·verification·navigation
src/lib/categories.ts         카테고리 3개 + 폴백 이미지(/images/categories/<slug>.jpg)
src/lib/posts.ts              로더·검증·정렬·인접글·관련글 (mtime 서명 캐시)
src/lib/markdown.ts           unified 파이프라인, h2 → section-n id, TOC, 글자 수
src/lib/seo.ts                JSON-LD 빌더
src/lib/legal.ts              시행일·개정 이력·formatDate(Asia/Seoul)·toIsoDateTime
src/app/globals.css           토큰·리셋·전체 스타일 (BEM식 클래스)
public/ads.txt public/icons/  public/images/categories/  (public/images/posts/는 글 이미지 자리)
next.config.ts                poweredByHeader false, nosniff·Referrer-Policy 헤더 (CSP·X-Frame-Options는 AdSense 때문에 두지 않음)
```

## 5. 명령어

```bash
pnpm install
pnpm dev          # 초안 포함, md 수정은 새로고침으로 반영
pnpm build        # 콘텐츠 검증 + 초안 제외
pnpm start
pnpm lint
pnpm typecheck
pnpm images       # assets/images-src/{posts,categories} → public/images/{posts,categories}/*.jpg
pnpm og           # OG·트위터 이미지, apple-icon, public/icons/* 재생성
```

## 6. 작업 중 알게 된 것 (다음 세션 주의)

- **Next 16 문서는 `node_modules/next/dist/docs/`에서 확인**(AGENTS.md 지시). 확인한 것: `dynamicParams`, `next typegen`(typecheck 순서), `next/font/google`은 `subsets`에 `korean`을 못 넣음, `images.qualities` 기본 `[75]`, route handler `force-static`, 404에 noindex 자동(빌드 결과로 확인), `headers()`의 `source: "/:path*"`, 파일 규칙 `twitter-image`·`apple-icon`·`*.alt.txt`.
- `metadata.alternates`는 페이지별 `alternates.canonical`이 통째로 덮어써서 RSS link는 `layout.tsx` head에 직접 둠.
- `Intl.DateTimeFormat`에 `timeZone: "Asia/Seoul"`이 없으면 Vercel(UTC)에서 날짜가 하루 앞서 보임(수정 완료). JSON-LD·OG·RSS 날짜는 `toIsoDateTime()` 한 곳에서 만듦.
- 마크다운 frontmatter의 날짜는 YAML이 Date로 파싱하므로 로더가 문자열로 정규화함.
- `##` 제목에 번호를 직접 쓰면 CSS 자동 번호와 겹침. 로더가 막지는 않으니 리뷰 때 확인.
- 구조화 데이터의 BreadcrumbList는 화면에 보이는 항목과 같아야 함. 글 페이지는 홈 › 카테고리 2단계.
- 존재하는 글은 `description` 40~160자, 본문 900자 이상(공백 제외) 규칙. 기준을 바꾸려면 `src/lib/posts.ts` 상단 상수.
- 샌드박스 환경 한정: 빌드 시 `NODE_USE_ENV_PROXY=1` 필요, 외부 사이트 접속 불가, 서버 종료는 `pgrep -f "next-serve[r]"` 형태로. 사용자 로컬에서는 해당 없음.
- 기존 8편의 `publishedAt`은 사이트 생성 이전 날짜지만 그대로 두었고 `updatedAt`만 기록함.
- `assets/images-src/`는 gitignore. 변환본 `public/images/**`만 커밋. 폴백 JPG를 다시 만들려면 원본 PNG를 `assets/images-src/categories/<slug>.png`로 두고 `pnpm images`.
- `pnpm-workspace.yaml`의 `allowBuilds: sharp: false`는 sharp가 prebuilt 바이너리를 쓰므로 문제없음(로컬 설치·`pnpm og`·`pnpm images` 확인). Vercel에서는 아직 검증 전.

## 7. 새 채팅 시작 문구 예시

> 저장소 `docs/handoff.md`를 읽고 이어서 작업해 줘. 브랜치 `claude/adsense-site-plan-rjqm5f`. 이번에 할 일: (예) 글 이미지 넣기 / 글에 내부 링크 추가 / 승인 후 광고 슬롯 추가.
