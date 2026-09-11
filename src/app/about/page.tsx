import type { Metadata } from "next";
import Link from "next/link";
import { AuthorBox } from "@/components/author-box";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { categoryInfo, categorySlugs, getPostsByCategory } from "@/lib/posts";
import { siteAuthor } from "@/lib/site";
import { breadcrumbJsonLd, organizationJsonLd, personJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "사이트 소개",
  description: "알고가요를 누가, 왜, 어떤 기준으로 만드는지 소개합니다. 운영자, 다루는 주제, 편집 원칙과 콘텐츠 검수 과정을 안내합니다.",
  path: "/about",
});

const topicNotes: Record<string, string> = {
  living: "고정비, 장보기, 식비, 공과금처럼 매달 반복되는 지출을 점검합니다.",
  digital: "사진, 알림, 비밀번호, 저장 공간처럼 쌓이기 쉬운 디지털 생활을 정리합니다.",
  travel: "짐과 동선을 줄이고 예약 조건과 변수에 대비하는 현실적인 준비법을 전합니다.",
};

export default function AboutPage() {
  return (
    <div className="shell prose-page about-page">
      <header className="page-intro">
        <p className="kicker">ABOUT ALGOGAYO</p>
        <h1>알아두면 생활이<br />조금 가벼워지니까</h1>
        <p>알고가요는 복잡한 생활 정보를 독자가 바로 실행할 수 있는 순서로 바꾸는 한국어 실용 가이드입니다. 2026년 7월부터 운영자가 직접 글을 쓰고 검수합니다.</p>
      </header>

      <div className="about-statement">
        <span>알고</span><span>가요</span>
        <p>찾느라 오래 헤매지 않고, 읽은 뒤 한 가지라도 직접 해볼 수 있는 글을 만듭니다.</p>
      </div>

      <section>
        <h2>다루는 주제</h2>
        <p>현재는 생활비, 디지털 습관, 가벼운 여행이라는 세 분야에 집중합니다. 서로 달라 보이지만 모두 선택지를 줄이고 반복 가능한 기준을 만드는 일과 연결되어 있습니다. 주제를 넓히는 대신 각 분야의 글을 꾸준히 채워 갑니다.</p>
        <div className="topic-grid">
          {categorySlugs.map((slug) => (
            <Link key={slug} href={`/category/${slug}`}>
              <strong>{categoryInfo[slug].name}</strong>
              <span>{topicNotes[slug]}</span>
              <small>글 {getPostsByCategory(slug).length}개</small>
            </Link>
          ))}
        </div>
      </section>

      <section id="author" className="about-operator">
        <h2>운영자 소개</h2>
        <AuthorBox showProfileLink={false} />
        <p>알고가요는 2026년 7월, 생활 정보를 찾을 때마다 광고와 과장된 후기 사이에서 정말 필요한 순서를 골라내는 데 시간이 너무 든다는 불편에서 시작했습니다. 운영자는 ‘{siteAuthor.name}’이라는 필명으로 활동하며 글의 기획, 작성, 검수를 직접 맡습니다. 실명 대신 필명을 쓰지만 문의에는 운영자가 직접 답합니다.</p>
        <p>특정 기업이나 기관에 소속되어 글을 쓰지 않고, 특정 제품이나 서비스로부터 대가를 받고 글을 쓰지도 않습니다. 글에 등장하는 서비스는 설명을 위한 예시이며, 제휴 링크를 쓰게 되면 해당 글에 따로 표시합니다. 글을 쓸 때는 실제로 따라 해 본 방법만 다루고, 요금·제도·설정 경로처럼 바뀌는 정보는 공식 자료를 참고 자료로 남깁니다.</p>
      </section>

      <section>
        <h2>편집 원칙</h2>
        <ol className="principle-list">
          <li><span>01</span><div><strong>독자의 다음 행동을 먼저 생각합니다.</strong><p>정보를 나열하기보다 무엇부터 확인하고 어떤 기준으로 결정할지 순서로 설명합니다.</p></div></li>
          <li><span>02</span><div><strong>근거와 조건을 함께 씁니다.</strong><p>제도, 안전, 금융처럼 조건에 따라 결과가 달라지는 내용은 공식 안내를 우선하며 예외와 확인할 점을 밝힙니다.</p></div></li>
          <li><span>03</span><div><strong>과장된 약속을 하지 않습니다.</strong><p>‘무조건’, ‘누구나’, ‘완벽하게’ 같은 표현을 경계하고 각자의 환경에 맞춰 조정할 여지를 남깁니다.</p></div></li>
          <li><span>04</span><div><strong>읽기 쉽고 접근 가능한 형태를 지향합니다.</strong><p>명확한 제목, 충분한 글자 크기, 이미지 대체 텍스트, 키보드 탐색을 기본으로 점검합니다.</p></div></li>
        </ol>
      </section>

      <section>
        <h2>콘텐츠를 만들고 검수하는 과정</h2>
        <p>모든 글은 아래 네 단계를 거쳐 발행합니다. 한 번 발행한 글도 요금이나 제도가 바뀌면 다시 확인하고, 크게 고친 글에는 업데이트 날짜를 표시합니다.</p>
        <ol className="principle-list">
          <li><span>01</span><div><strong>주제 선정</strong><p>독자가 실제로 검색하고 반복해서 겪는 문제 가운데, 순서와 기준을 정리하면 바로 해결되는 주제를 고릅니다.</p></div></li>
          <li><span>02</span><div><strong>공식 자료 확인</strong><p>요금, 수수료, 제도는 운영 기관의 공식 안내와 법령 정보를 확인하고 글 하단 참고 자료에 출처를 남깁니다.</p></div></li>
          <li><span>03</span><div><strong>직접 실행 후 초안 작성</strong><p>설정 경로와 절차는 운영자가 직접 따라 해 본 뒤, 막히는 지점과 예외 상황을 함께 적습니다.</p></div></li>
          <li><span>04</span><div><strong>검수와 업데이트</strong><p>발행 전 숫자와 링크를 다시 확인하고, 독자 문의나 제도 변경이 있으면 내용을 고쳐 업데이트 날짜를 표시합니다.</p></div></li>
        </ol>
      </section>

      <section>
        <h2>콘텐츠와 이미지</h2>
        <p>글은 {siteAuthor.name}이 사이트 목적에 맞춰 직접 구성하고 검토합니다. 대표 일러스트는 알고가요를 위해 만든 오리지널 이미지로, 외부 스톡 사진이나 타인의 저작물을 무단으로 사용하지 않습니다. 글의 오류나 보완할 점을 발견하셨다면 <Link className="inline-link" href="/contact">문의 페이지</Link>로 알려주세요.</p>
      </section>

      <section>
        <h2>광고와 수익에 대한 안내</h2>
        <p>알고가요는 Google AdSense 광고를 게재해 도메인과 호스팅 비용을 충당합니다. 광고는 본문과 구분해 표시하며 편집 내용에 영향을 주지 않습니다. 자세한 내용은 <Link className="inline-link" href="/disclaimer">면책조항</Link>과 <Link className="inline-link" href="/privacy">개인정보처리방침</Link>에서 확인할 수 있습니다.</p>
      </section>

      <JsonLd data={[personJsonLd(), organizationJsonLd(), breadcrumbJsonLd([{ name: "홈", href: "/" }, { name: "사이트 소개", href: "/about" }])]} />
    </div>
  );
}
