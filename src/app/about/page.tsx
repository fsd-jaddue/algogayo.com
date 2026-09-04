import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: "알고가요가 생활 정보를 고르고 확인하고 정리하는 편집 원칙을 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="shell prose-page about-page">
      <header className="page-intro">
        <p className="kicker">ABOUT ALGOGAYO</p>
        <h1>알아두면 생활이<br />조금 가벼워지니까</h1>
        <p>알고가요는 복잡한 생활 정보를 독자가 바로 실행할 수 있는 순서로 바꾸는 한국어 실용 가이드입니다.</p>
      </header>

      <div className="about-statement">
        <span>알고</span><span>가요</span>
        <p>찾느라 오래 헤매지 않고, 읽은 뒤 한 가지라도 직접 해볼 수 있는 글을 만듭니다.</p>
      </div>

      <section>
        <h2>다루는 주제</h2>
        <p>현재는 생활비, 디지털 습관, 가벼운 여행이라는 세 분야에 집중합니다. 서로 달라 보이지만 모두 선택지를 줄이고 반복 가능한 기준을 만드는 일과 연결되어 있습니다.</p>
        <div className="topic-grid">
          <Link href="/category/living"><strong>생활비</strong><span>고정비, 장보기, 식비처럼 매달 반복되는 지출을 점검합니다.</span></Link>
          <Link href="/category/digital"><strong>디지털</strong><span>사진, 알림, 비밀번호처럼 쌓이기 쉬운 디지털 생활을 정리합니다.</span></Link>
          <Link href="/category/travel"><strong>여행</strong><span>짐과 동선을 줄이고 변수에 대비하는 현실적인 준비법을 전합니다.</span></Link>
        </div>
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
        <h2>콘텐츠와 이미지</h2>
        <p>글은 알고가요 편집팀이 사이트 목적에 맞춰 직접 구성하고 검토합니다. 대표 일러스트는 알고가요를 위해 생성한 오리지널 이미지로, 외부 스톡 사진이나 타인의 저작물을 무단으로 사용하지 않습니다. 글의 오류나 보완할 점을 발견하셨다면 <Link className="inline-link" href="/contact">문의 페이지</Link>로 알려주세요.</p>
      </section>
    </div>
  );
}

