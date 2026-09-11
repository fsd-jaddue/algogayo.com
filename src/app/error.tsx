"use client";

import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ error, retry }: Props) {
  return (
    <div className="shell not-found">
      <p className="kicker">오류</p>
      <h1>잠시 문제가 생겼어요</h1>
      <p>페이지를 표시하는 중 오류가 발생했습니다. 다시 시도해도 같은 문제가 반복되면 문의 페이지로 알려 주세요.</p>
      {error.digest && <p className="error-digest">오류 코드: {error.digest}</p>}
      <div>
        <button className="button button-primary" type="button" onClick={() => retry()}>다시 시도</button>
        <Link className="button button-quiet" href="/">홈으로 가기</Link>
        <Link className="button button-quiet" href="/contact">문의하기</Link>
      </div>
    </div>
  );
}
