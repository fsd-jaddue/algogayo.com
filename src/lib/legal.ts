/**
 * 정책 문서의 시행일과 개정 이력.
 * 문서를 고치면 여기 날짜를 갱신하고 이력을 한 줄 추가하세요.
 */
export const privacyPolicy = {
  effectiveDate: "2026-09-07",
  history: [
    { date: "2026-09-07", note: "국외 이전 수탁자별 개인정보 보호정책 링크 추가, 제3자 제공 조항에 광고 쿠키 예외 명시, 사용하지 않는 방문 통계 문구 삭제, 조문 표기 통일" },
    { date: "2026-09-06", note: "광고 서비스(Google AdSense) 고지, 쿠키 거부 방법, 개인정보 보호책임자, 권익침해 구제 방법을 추가하고 전체 구성을 정비" },
    { date: "2026-09-05", note: "최초 제정" },
  ],
} as const;

export const termsOfService = {
  effectiveDate: "2026-09-07",
  history: [
    { date: "2026-09-07", note: "이용자에게 불리하지 않은 변경의 즉시 시행 조항 추가" },
    { date: "2026-09-06", note: "광고 및 수익 조항, 준거법 조항 추가" },
    { date: "2026-09-05", note: "최초 제정" },
  ],
} as const;

/** YYYY-MM-DD를 한국 시간 오전 9시 기준 ISO 8601 타임스탬프로 바꾼다. JSON-LD, Open Graph, RSS가 같은 값을 쓴다. */
export function toIsoDateTime(value: string) {
  return `${value}T09:00:00+09:00`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${value}T00:00:00+09:00`));
}
