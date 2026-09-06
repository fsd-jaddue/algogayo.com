import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell not-found">
      <p className="kicker">404</p>
      <h1>찾으시는 페이지가 없어요</h1>
      <p>주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래에서 다른 글을 찾아보세요.</p>
      <div className="not-found__actions">
        <Link className="button button--primary" href="/">
          홈으로 가기
        </Link>
        <Link className="button button--ghost" href="/articles">
          전체 글 보기
        </Link>
      </div>
    </div>
  );
}
