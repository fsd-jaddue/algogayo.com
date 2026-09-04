import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의하기",
  description: "알고가요의 글 제안, 오류 신고, 개인정보 및 콘텐츠 이용 문의 방법을 안내합니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const subject = encodeURIComponent("[알고가요 문의]");
  return (
    <div className="shell contact-page">
      <header className="page-intro compact"><p className="kicker">CONTACT</p><h1>문의하기</h1><p>글에서 이해하기 어려운 부분이나 수정이 필요한 내용을 알려주세요.</p></header>
      <div className="contact-grid">
        <section className="contact-card primary-contact">
          <span>이메일</span><h2>{siteConfig.email}</h2>
          <p>문의 내용을 확인한 뒤 순서대로 답변드립니다. 답변에는 영업일 기준 3~5일이 걸릴 수 있습니다.</p>
          <a className="button button-primary" href={`mailto:${siteConfig.email}?subject=${subject}`}>이메일 보내기</a>
        </section>
        <section className="contact-card">
          <span>빠른 확인을 위해</span><h2>이 내용을 함께 적어주세요</h2>
          <ul><li>문의하는 글의 제목 또는 주소</li><li>수정이 필요하다고 생각한 문장</li><li>확인할 수 있는 공식 자료나 근거</li><li>답변받을 이메일 주소</li></ul>
        </section>
      </div>
      <section className="contact-notice"><h2>문의 유형</h2><div><article><strong>콘텐츠 오류</strong><p>사실과 다른 내용, 오래된 정보, 작동하지 않는 링크를 알려주세요.</p></article><article><strong>개인정보</strong><p>문의 기록의 열람·수정·삭제 요청을 접수합니다.</p></article><article><strong>콘텐츠 이용</strong><p>인용, 재사용, 협업과 관련된 허락 범위를 안내합니다.</p></article></div></section>
    </div>
  );
}

