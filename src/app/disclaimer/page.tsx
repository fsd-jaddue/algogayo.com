import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { legalEffectiveDate, siteAuthor, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "면책조항",
  description: "알고가요 콘텐츠의 정보 제공 목적, 전문 자문과의 차이, 정확성의 한계, 외부 링크와 광고에 관한 안내입니다.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="shell legal-page">
      <header className="page-intro compact">
        <p className="kicker">DISCLAIMER</p>
        <h1>면책조항</h1>
        <p>시행일: {formatDate(legalEffectiveDate)}</p>
      </header>
      <div className="legal-summary">알고가요의 글은 일반적인 정보 제공을 목적으로 합니다. 개인의 상황에 맞는 결정은 최신 공식 자료와 전문가 확인을 거쳐 내려 주세요.</div>

      <section>
        <h2>1. 정보 제공의 목적</h2>
        <p>알고가요는 생활비, 디지털 습관, 여행 준비에 관한 일반적인 정보와 실용적인 방법을 소개하는 개인 운영 웹사이트입니다. 글은 운영자({siteAuthor.name})가 직접 실행해 보고 공식 자료와 대조해 작성하지만, 특정 개인이나 상황을 전제로 한 조언이 아닙니다. 독자마다 소득, 가족 구성, 사용하는 기기와 서비스, 거주 지역이 다르므로 같은 방법이라도 결과는 달라질 수 있습니다.</p>
      </section>

      <section>
        <h2>2. 전문 자문이 아닙니다</h2>
        <p>사이트의 내용은 법률, 세무, 금융·투자, 의료, 보험 등 자격을 갖춘 전문가의 자문을 대신하지 않습니다. 예를 들어 비상금, 보험, 통신 요금제와 관련한 글은 선택 기준을 설명할 뿐 특정 상품의 가입이나 해지를 권유하지 않으며, 환불·청약철회 관련 글은 일반적인 절차를 안내할 뿐 개별 분쟁의 결과를 보장하지 않습니다.</p>
        <p>중요한 결정을 내리기 전에는 해당 기관의 공식 안내와 계약 조건을 직접 확인하고, 필요하면 전문가와 상담하세요. 건강이나 안전과 관련된 내용은 반드시 의료기관이나 관계 기관의 안내를 우선합니다.</p>
      </section>

      <section>
        <h2>3. 정확성과 최신성의 한계</h2>
        <p>요금, 수수료, 제도, 앱의 설정 경로는 예고 없이 바뀝니다. 알고가요는 글을 작성한 시점에 참고한 공식 자료를 각 글의 참고 자료 목록에 밝히고, 내용을 크게 고쳤을 때는 업데이트 날짜를 표시합니다. 그러나 모든 변경을 즉시 반영하지 못할 수 있으며, 정보의 완전성·정확성·특정 목적에 대한 적합성을 보증하지 않습니다.</p>
        <p>오래된 정보나 오류를 발견하셨다면 <Link className="inline-link" href="/contact">문의 페이지</Link>로 알려 주세요. 확인 후 수정하고, 수정한 글에는 업데이트 날짜를 남깁니다.</p>
      </section>

      <section>
        <h2>4. 외부 링크</h2>
        <p>글에는 공공기관, 서비스 도움말 등 외부 사이트로 이어지는 링크가 포함됩니다. 외부 사이트의 내용, 이용 조건, 개인정보 처리는 해당 운영자의 책임이며 알고가요가 그 내용을 보증하지 않습니다. 링크는 독자가 원문을 확인하도록 돕기 위한 것으로, 링크 대상과의 제휴나 추천을 뜻하지 않습니다.</p>
      </section>

      <section>
        <h2>5. 광고와 수익에 관한 안내</h2>
        <p>알고가요는 Google AdSense를 통해 광고를 게재하며, 광고 수익으로 도메인과 호스팅 등 운영 비용을 충당합니다. 광고는 Google과 광고주가 제공하는 것으로, 광고의 내용과 거래 조건은 광고주가 책임집니다. 광고 게재 여부와 위치는 편집 내용에 영향을 주지 않으며, 광고 영역은 본문과 구분되도록 표시합니다.</p>
        <p>특정 상품이나 서비스 링크로 수익이 발생하는 제휴 링크를 사용하는 경우에는 해당 글 안에 별도로 표시합니다. 현재 알고가요는 제휴 링크를 사용하지 않으며, 글에 등장하는 서비스나 제품은 설명을 위한 예시일 뿐 광고나 협찬이 아닙니다.</p>
      </section>

      <section>
        <h2>6. 책임의 제한</h2>
        <p>이용자가 사이트의 정보를 자신의 상황에 맞게 확인하지 않고 적용해 발생한 손해에 대해 알고가요는 관련 법령이 허용하는 범위에서 책임을 지지 않습니다. 통신 장애, 호스팅 사업자의 장애처럼 합리적으로 통제할 수 없는 사유로 발생한 접속 불가나 정보 유실에 대해서도 같은 범위에서 책임이 제한됩니다.</p>
      </section>

      <section>
        <h2>7. 문의</h2>
        <p>면책조항에 관한 문의: <a className="inline-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
        <p>개인정보 처리에 관한 내용은 <Link className="inline-link" href="/privacy">개인정보처리방침</Link>, 사이트 이용 조건은 <Link className="inline-link" href="/terms">이용약관</Link>을 확인해 주세요.</p>
      </section>
    </div>
  );
}
