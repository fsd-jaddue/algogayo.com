const KST_OFFSET = "T00:00:00+09:00";

/** 2026-09-11 → 2026년 9월 11일. 서버 시간대와 무관하게 한국 날짜로 표기한다. */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${value}${KST_OFFSET}`));
}

/** RSS pubDate 형식 (RFC 822). 발행일 오전 9시 KST 기준 */
export function toRfc822(value: string): string {
  return new Date(`${value}T09:00:00+09:00`).toUTCString();
}
