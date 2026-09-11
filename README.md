# 알고가요

생활비, 디지털 습관, 가벼운 여행을 더 단순하게 만드는 한국어 실용 가이드입니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

프로덕션 빌드는 `pnpm build`, 검사는 `pnpm lint`(ESLint + 콘텐츠 검사)로 확인합니다.

## 콘텐츠 구조

- 발행 글: `src/content/posts/<slug>.ts` — 파일마다 `post: PostEntry`(meta + content)를 export 합니다.
- 글 목록 등록: `src/content/index.ts` — 새 글을 발행할 때 import 한 줄과 배열 항목을 추가합니다. 정렬은 발행일 기준으로 자동 처리됩니다.
- 초안: `src/content/drafts/` — 아직 발행하지 않은 글. 빌드에 포함되지 않습니다.
- 타입: `src/lib/content-types.ts` (섹션에 `steps`, `table`, `links`, 글에 `faq`, `references`, `checklist` 지원)
- 접근 헬퍼: `src/lib/posts.ts` (`getPostBySlug`, `getPostsByCategory`, `getRelatedPosts` 등). 읽기 시간은 본문 글자 수로 자동 계산됩니다.
- 사이트 기본 정보·운영자·메뉴: `src/lib/site.ts`
- 구조화 데이터: `src/lib/structured-data.ts`, `src/components/json-ld.tsx`

### 글 발행 절차

1. `src/content/drafts/<slug>.ts` 초안을 검수합니다. 요금·제도 수치는 참고 자료의 공식 출처에서 다시 확인합니다.
2. `publishedAt`을 실제 배포일(YYYY-MM-DD)로 바꾸고 파일을 `src/content/posts/`로 옮깁니다.
3. `src/content/index.ts`에 import와 배열 항목을 추가합니다.
4. `pnpm images`로 대표 이미지를 생성하고(이미 있으면 건너뜀), `pnpm check:content`로 글자 수·참고 자료·내부 링크·이미지를 검사합니다.
5. 발행 후 관련 글의 `links`/`related`에 새 글을 추가해 내부 링크를 연결합니다.

기존 글을 크게 고쳤을 때는 `updatedAt`을 갱신합니다. 글 페이지와 사이트맵, RSS에 반영됩니다.

## 이미지

- 글 대표 이미지: `public/images/posts/<slug>.webp` (1600×900). `scripts/render-covers.mjs`가 Playwright + Chromium으로 제목 기반 커버를 렌더링합니다. 직접 만든 일러스트로 교체하려면 같은 파일명으로 덮어쓰면 됩니다.
- 카테고리 배경·로고·아이콘·OG 기본 이미지: `scripts/optimize-images.mjs` (sharp)
- 한글 렌더링을 위해 렌더 환경에 한글 폰트(Gothic A1, Noto Sans KR 등)가 설치되어 있어야 합니다.

## 검색·AdSense 연결

사이트맵(`/sitemap.xml`), robots, RSS(`/feed.xml`), 웹 매니페스트는 Next.js 메타데이터 라우트로 자동 생성됩니다. Vercel 프로젝트에 아래 환경 변수를 설정하면 코드 수정 없이 소유권 확인 메타 태그와 AdSense 계정 메타 태그가 추가됩니다.

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # 필수
NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT=     # ca-pub- 로 시작하는 전체 값
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=    # 선택
```

승인 전에는 광고 단위(`<ins class="adsbygoogle">`)를 넣지 않고 로더 스크립트와 `ads.txt`만 유지합니다. 승인·색인 절차와 개선 계획은 `docs/adsense-approval-plan.md`를 참고하세요.
