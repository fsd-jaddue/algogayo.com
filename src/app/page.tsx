import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { posts } from "@/lib/posts";

export default function Home() {
  const [featured, ...latest] = posts;

  return (
    <>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="kicker">오늘의 생활을 가볍게</p>
            <h1>알아두면 덜 헤매는<br />작고 확실한 방법들</h1>
            <p className="hero-lead">
              생활비를 정리하고, 디지털 피로를 줄이고, 여행 준비를 단순하게.
              알고가요는 오늘 바로 해볼 수 있는 순서로 정보를 전합니다.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/articles">최신 글 보기</Link>
              <Link className="button button-quiet" href="/about">어떻게 만드는지</Link>
            </div>
          </div>
          <Link className="featured-story" href={`/articles/${featured.slug}`}>
            <div className="featured-image">
              <Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" priority />
            </div>
            <div className="featured-overlay">
              <span>{featured.categoryLabel} · {featured.readingTime}</span>
              <strong>{featured.title}</strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="section shell" aria-labelledby="latest-heading">
        <div className="section-heading">
          <div>
            <p className="kicker">새로 정리했어요</p>
            <h2 id="latest-heading">최신 가이드</h2>
          </div>
          <Link className="text-link" href="/articles">전체 글 보기 <span aria-hidden="true">→</span></Link>
        </div>
        <div className="card-grid">
          {latest.slice(0, 6).map((post) => <ArticleCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="values-section">
        <div className="shell values-grid">
          <div>
            <p className="kicker">알고가요의 기준</p>
            <h2>읽는 시간을 아껴드려요</h2>
          </div>
          <div className="value-item">
            <span>01</span>
            <h3>먼저 결론부터</h3>
            <p>핵심을 앞에 두고, 필요한 이유와 예시는 뒤에서 차근차근 설명합니다.</p>
          </div>
          <div className="value-item">
            <span>02</span>
            <h3>직접 할 수 있게</h3>
            <p>막연한 조언보다 오늘 따라 할 수 있는 순서와 체크리스트를 제공합니다.</p>
          </div>
          <div className="value-item">
            <span>03</span>
            <h3>과장하지 않게</h3>
            <p>모든 사람에게 맞는 정답인 것처럼 말하지 않고 조건과 예외를 함께 적습니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}
