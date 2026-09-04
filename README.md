# 알고가요

생활비, 디지털 습관, 가벼운 여행을 더 단순하게 만드는 한국어 실용 가이드입니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

프로덕션 빌드는 `pnpm build`로 확인합니다.

## 콘텐츠 관리

- 글 목록과 메타데이터: `src/lib/posts.ts`
- 글 본문: `src/lib/post-content.ts`
- 사이트 기본 정보와 메뉴: `src/lib/site.ts`
- 이미지: `public/images`

## 검색 및 AdSense 연결

사이트맵과 robots.txt는 Next.js 메타데이터 라우트로 자동 생성됩니다. Vercel 프로젝트에서 아래 환경 변수를 설정하면 별도의 코드 수정 없이 Google 소유권 확인과 AdSense 계정 메타 태그가 추가됩니다.

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT=
```

AdSense 계정 값은 `ca-pub-`로 시작하는 전체 값을 입력합니다. 실제 광고 코드는 사이트 승인 후 Google의 최신 안내에 따라 추가하세요.
