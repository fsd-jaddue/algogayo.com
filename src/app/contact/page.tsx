import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { siteAuthor, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "문의하기",
  description: "알고가요의 글 제안, 오류 신고, 개인정보, 콘텐츠 이용, 광고·제휴 문의 방법과 답변 기준을 안내합니다.",
  path: "/contact",
});

const faq = [
  {
    question: "답변은 얼마나 걸리나요?",
    answer: "영업일 기준 3~5일 안에 답변합니다. 문의가 많거나 확인이 필요한 내용은 더 걸릴 수 있으며, 그 경우 중간에 진행 상황을 알려 드립니다.",
  },
  {
    question: "글 주제를 제안할 수 있나요?",
    answer: "네. 생활비, 디지털 습관, 여행 준비 세 주제 안에서 반복해서 겪는 불편이나 궁금한 점을 보내 주시면 검토 후 글로 다룰 수 있습니다. 모든 제안을 글로 만들지는 못하지만 답변은 드립니다.",
  },
  {
    question: "광고나 제휴 제안도 받나요?",
    answer: "받습니다. 다만 알고가요는 대가를 받고 특정 제품을 추천하는 글을 쓰지 않으며, 제휴 링크를 사용하게 되면 해당 글에 표시합니다. 편집 독립성을 유지할 수 있는 제안만 검토합니다.",
  },
];

export default function ContactPage() {
  const subject = encodeURIComponent("[알고가요 문의]");
  return (
    <div className="shell contact-page">
      <header className="page-intro compact">
        <p className="kicker">CONTACT</p>
        <h1>문의하기</h1>
        <p>글에서 이해하기 어려운 부분이나 수정이 필요한 내용을 알려주세요. 운영자 {siteAuthor.name}이 직접 확인하고 답변합니다.</p>
      </header>
      <div className="contact-grid">
        <section className="contact-card primary-contact">
          <span>이메일</span>
          <h2>{siteConfig.email}</h2>
          <p>문의 내용을 확인한 뒤 순서대로 답변드립니다. 답변에는 영업일 기준 3~5일이 걸릴 수 있습니다. 회신받을 이메일 주소가 없으면 답변할 수 없습니다.</p>
          <a className="button button-primary" href={`mailto:${siteConfig.email}?subject=${subject}`}>이메일 보내기</a>
        </section>
        <section className="contact-card">
          <span>빠른 확인을 위해</span>
          <h2>이 내용을 함께 적어주세요</h2>
          <ul>
            <li>문의하는 글의 제목 또는 주소</li>
            <li>수정이 필요하다고 생각한 문장</li>
            <li>확인할 수 있는 공식 자료나 근거</li>
            <li>답변받을 이메일 주소</li>
          </ul>
        </section>
      </div>
      <section className="contact-notice">
        <h2>문의 유형</h2>
        <div>
          <article><strong>콘텐츠 오류</strong><p>사실과 다른 내용, 오래된 정보, 작동하지 않는 링크를 알려주세요.</p></article>
          <article><strong>개인정보</strong><p>문의 기록의 열람·수정·삭제 요청을 접수합니다.</p></article>
          <article><strong>콘텐츠 이용</strong><p>인용, 재사용, 협업과 관련된 허락 범위를 안내합니다.</p></article>
          <article><strong>광고·제휴</strong><p>광고 게재와 제휴 제안을 검토합니다. 편집 독립성을 지킬 수 있는 제안만 진행합니다.</p></article>
        </div>
      </section>
      <section className="contact-faq" aria-labelledby="contact-faq-title">
        <p className="kicker">FAQ</p>
        <h2 id="contact-faq-title">자주 묻는 질문</h2>
        {faq.map((item) => (
          <div className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>
      <p className="contact-privacy">문의 시 제공하신 이메일 주소와 내용은 답변 목적으로만 사용하며, 처리 방식은 <Link className="inline-link" href="/privacy">개인정보처리방침</Link>에서 확인할 수 있습니다.</p>
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", href: "/" }, { name: "문의하기", href: "/contact" }])} />
    </div>
  );
}
