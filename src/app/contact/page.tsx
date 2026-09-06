import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const description = "알고가요에 글 제안, 오류 신고, 개인정보 및 콘텐츠 이용 문의를 보내는 방법과 처리 기간을 안내합니다.";

export const metadata: Metadata = {
  title: "문의하기",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "문의하기 | 알고가요", description, url: "/contact" },
};

const topics = [
  { title: "글 내용 오류", body: "사실과 다른 내용, 오래된 정보, 작동하지 않는 링크를 알려주세요. 확인 후 글을 고치고 수정일을 표시합니다." },
  { title: "글 제안", body: "다뤘으면 하는 주제나 궁금한 점을 보내주세요. 여러 분이 비슷하게 묻는 주제부터 우선 정리합니다." },
  { title: "개인정보", body: "문의 기록의 열람·정정·삭제·처리 정지 요청을 접수합니다. 본인 확인이 필요한 경우 최소한의 정보를 추가로 요청할 수 있습니다." },
  { title: "콘텐츠 이용", body: "인용, 재사용, 협업과 관련된 허락 범위를 안내합니다. 링크 공유는 별도 허락 없이 가능합니다." },
];

export default function ContactPage() {
  const subject = encodeURIComponent("[알고가요 문의]");
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "문의하기", href: "/contact" },
  ];

  return (
    <div className="shell shell--narrow prose-page">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker="Contact"
        title="문의하기"
        narrow
        lead={<p>글에서 이해하기 어려운 부분이나 수정이 필요한 내용, 다뤘으면 하는 주제를 이메일로 알려주세요.</p>}
      />

      <div className="contact-grid">
        <section className="contact-card contact-card--primary" aria-labelledby="contact-email">
          <p className="kicker">이메일</p>
          <h2 id="contact-email">{siteConfig.email}</h2>
          <p>문의를 확인한 뒤 순서대로 답변드립니다. 답변에는 영업일 기준 3~5일이 걸릴 수 있습니다.</p>
          <a className="button button--light" href={`mailto:${siteConfig.email}?subject=${subject}`}>
            이메일 보내기
          </a>
        </section>
        <section className="contact-card" aria-labelledby="contact-tips">
          <p className="kicker">빠른 확인을 위해</p>
          <h2 id="contact-tips">이 내용을 함께 적어주세요</h2>
          <ul>
            <li>문의하는 글의 제목 또는 주소</li>
            <li>수정이 필요하다고 생각한 문장</li>
            <li>확인할 수 있는 공식 자료나 근거</li>
            <li>답변받을 이메일 주소</li>
          </ul>
        </section>
      </div>

      <section className="prose-section" aria-labelledby="contact-topics">
        <h2 id="contact-topics">문의 유형</h2>
        <dl className="topic-grid">
          {topics.map((topic) => (
            <div key={topic.title}>
              <dt>{topic.title}</dt>
              <dd>{topic.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="prose-section" aria-labelledby="contact-privacy">
        <h2 id="contact-privacy">문의 정보의 처리</h2>
        <p>
          이메일로 보내주신 주소와 내용은 문의 확인과 답변에만 사용하며, 답변이 끝난 뒤 보관 기간이 지나면 삭제합니다.
          자세한 내용은 <Link href="/privacy">개인정보처리방침</Link>을 확인해 주세요.
        </p>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
