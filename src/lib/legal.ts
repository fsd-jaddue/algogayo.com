/**
 * 정책 문서의 시행일과 개정 이력.
 * 문서를 고치면 여기 날짜를 갱신하고 이력을 한 줄 추가하세요.
 */
export const privacyPolicy = {
  effectiveDate: "2026-09-06",
  history: [
    { date: "2026-09-06", note: "광고 서비스(Google AdSense) 고지, 쿠키 거부 방법, 개인정보 보호책임자, 권익침해 구제 방법을 추가하고 전체 구성을 정비" },
    { date: "2026-09-05", note: "최초 제정" },
  ],
} as const;

export const termsOfService = {
  effectiveDate: "2026-09-06",
  history: [
    { date: "2026-09-06", note: "광고 및 수익 조항, 준거법 조항 추가" },
    { date: "2026-09-05", note: "최초 제정" },
  ],
} as const;

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${value}T00:00:00+09:00`));
}
