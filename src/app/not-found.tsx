import Link from "next/link";
import { categoryInfo, categorySlugs, getLatestPosts } from "@/lib/posts";

export default function NotFound() {
  const latest = getLatestPosts(3);
  return (
    <div className="shell not-found">
      <p className="kicker">404</p>
      <h1>찾으시는 페이지가 없어요</h1>
      <p>주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래에서 다른 글을 찾아보세요.</p>
      <div>
        <Link className="button button-primary" href="/">홈으로 가기</Link>
        <Link className="button button-quiet" href="/articles">전체 글 보기</Link>
      </div>
      <nav className="chip-row" aria-label="카테고리">
        {categorySlugs.map((slug) => (
          <Link key={slug} className="chip-link" href={`/category/${slug}`}>{categoryInfo[slug].name}</Link>
        ))}
      </nav>
      <section className="not-found-latest" aria-labelledby="not-found-latest">
        <h2 id="not-found-latest">최근 올라온 글</h2>
        <ul>
          {latest.map((post) => (
            <li key={post.slug}><Link href={`/articles/${post.slug}`}>{post.title}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
