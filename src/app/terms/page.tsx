import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { formatDate, termsOfService } from "@/lib/legal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const description = "알고가요 사이트와 콘텐츠 이용에 적용되는 조건, 저작권, 광고 게재, 책임의 범위를 안내합니다.";

export const metadata: Metadata = {
  title: "이용약관",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "이용약관 | 알고가요", description, url: "/terms" },
};

export default function TermsPage() {
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "이용약관", href: "/terms" },
  ];

  return (
    <div className="shell shell--narrow legal">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker="Terms of Use"
        title="이용약관"
        narrow
        lead={
          <p className="legal__meta">
            시행일: <time dateTime={termsOfService.effectiveDate}>{formatDate(termsOfService.effectiveDate)}</time>
          </p>
        }
      />
      <p className="legal__summary">
        알고가요를 이용하면 아래 조건에 동의하는 것으로 봅니다. 이해하기 어려운 부분은 언제든{" "}
        <Link href="/contact">문의</Link>해 주세요.
      </p>

      <section aria-labelledby="t1">
        <h2 id="t1">제1조 목적</h2>
        <p>
          이 약관은 알고가요(algogayo.com, 이하 ‘사이트’)가 제공하는 웹사이트와 콘텐츠의 이용 조건, 운영자와 이용자의
          권리와 책임을 정하는 것을 목적으로 합니다.
        </p>
      </section>

      <section aria-labelledby="t2">
        <h2 id="t2">제2조 제공하는 서비스</h2>
        <p>
          사이트는 생활비, 디지털 습관, 여행 준비 등에 관한 일반적인 정보와 실용 가이드를 무료로 제공합니다. 서비스
          내용은 품질 개선, 운영상 필요 또는 관련 정책 변화에 따라 추가·변경·중단될 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="t3">
        <h2 id="t3">제3조 정보 이용 시 주의사항</h2>
        <p>
          사이트의 글은 일반적인 정보 제공을 목적으로 하며 개인의 구체적인 상황에 대한 법률·의료·세무·재무 등 전문
          자문을 대신하지 않습니다. 중요한 결정을 내릴 때는 최신 공식 자료와 계약 조건을 확인하고, 필요한 경우 자격을
          갖춘 전문가에게 상담받아야 합니다.
        </p>
        <p>
          운영자는 게시 시점에 정확하고 유용한 정보를 제공하기 위해 노력하지만, 정보의 완전성·최신성·특정 목적 적합성을
          보증하지 않습니다. 외부 제도와 서비스 조건은 예고 없이 변경될 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="t4">
        <h2 id="t4">제4조 금지 행위</h2>
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <ul>
          <li>사이트 운영을 방해하거나 보안을 침해하는 행위</li>
          <li>자동화된 수단으로 과도한 요청을 보내 서비스에 부담을 주는 행위</li>
          <li>타인의 권리를 침해하거나 법령을 위반하는 행위</li>
          <li>콘텐츠를 허위 출처로 재배포하거나 출처를 지운 채 복제하는 행위</li>
          <li>광고를 부정하게 클릭하거나 클릭을 유도하는 행위</li>
        </ul>
      </section>

      <section aria-labelledby="t5">
        <h2 id="t5">제5조 저작권과 콘텐츠 이용</h2>
        <p>
          사이트의 글, 구성, 디자인, 자체 제작 이미지에 관한 권리는 알고가요 또는 정당한 권리자에게 있습니다. 개인적인
          학습과 비상업적 참고를 위한 열람과 링크 공유는 별도 허락 없이 가능합니다. 글 전체를 복제하거나 이미지를 별도로
          배포하거나 상업적으로 이용하려면 사전 허락이 필요합니다. 짧은 인용은 출처와 원문 링크를 명확히 표시하고 관련
          법령이 허용하는 범위에서만 가능합니다.
        </p>
      </section>

      <section aria-labelledby="t6">
        <h2 id="t6">제6조 외부 링크</h2>
        <p>
          사이트는 이용자의 이해를 돕기 위해 외부 사이트로 연결되는 링크를 제공할 수 있습니다. 외부 사이트의 내용과
          개인정보 처리 방식은 해당 운영자가 책임지며, 링크 제공이 해당 사이트의 내용을 보증하는 것은 아닙니다.
        </p>
      </section>

      <section aria-labelledby="t7">
        <h2 id="t7">제7조 광고 및 수익</h2>
        <p>
          사이트는 운영 비용을 충당하기 위해 Google AdSense 등 광고 서비스를 통해 광고를 게재하거나 게재할 수 있습니다.
          광고의 내용과 광고를 통해 이루어지는 거래 조건은 광고주 또는 연결된 서비스가 책임집니다. 광고는 본문과
          구분되는 위치에 표시되며, 광고를 보거나 클릭하지 않아도 모든 콘텐츠를 이용할 수 있습니다.
        </p>
        <p>
          제휴 링크를 사용하거나 특정 상품·서비스로부터 대가를 받는 경우 해당 글에 그 사실을 표시합니다. 광고와 관련한
          쿠키 사용은 <Link href="/privacy">개인정보처리방침</Link>에서 안내합니다.
        </p>
      </section>

      <section aria-labelledby="t8">
        <h2 id="t8">제8조 책임의 범위</h2>
        <p>
          운영자는 천재지변, 통신 장애, 호스팅 사업자의 장애처럼 합리적으로 통제하기 어려운 사유로 발생한 서비스 중단에
          대해 책임을 지지 않습니다. 이용자가 사이트의 정보를 자신의 상황에 맞는지 확인하지 않고 적용해 발생한 손해에
          대해서는 관련 법령이 허용하는 범위에서 책임이 제한될 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="t9">
        <h2 id="t9">제9조 약관의 변경</h2>
        <p>
          필요한 경우 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다. 변경 사항은 시행 7일 전부터
          사이트를 통해 알리며, 시행일 이후 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 봅니다. 다만 법령 반영이나
          표현 수정처럼 이용자에게 불리하지 않은 변경은 공지와 동시에 시행할 수 있습니다.
        </p>
        <ul className="legal__history">
          {termsOfService.history.map((item) => (
            <li key={item.date}>
              <time dateTime={item.date}>{formatDate(item.date)}</time> — {item.note}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="t10">
        <h2 id="t10">제10조 준거법과 분쟁 해결</h2>
        <p>
          이 약관은 대한민국 법령에 따라 해석됩니다. 사이트 이용과 관련한 분쟁은 먼저 상호 협의로 해결하며, 협의가
          이루어지지 않을 때는 민사소송법에 따른 관할 법원에 소를 제기할 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="t11">
        <h2 id="t11">제11조 문의</h2>
        <p>
          약관과 콘텐츠 이용에 관한 문의는 <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>으로 보내주세요.
          자세한 안내는 <Link href="/contact">문의 페이지</Link>에 있습니다.
        </p>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
