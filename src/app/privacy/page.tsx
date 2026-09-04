import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "알고가요의 개인정보 수집·이용, 쿠키, 제3자 서비스 및 이용자 권리를 안내합니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="shell legal-page">
      <header className="page-intro compact">
        <p className="kicker">PRIVACY POLICY</p>
        <h1>개인정보처리방침</h1>
        <p>시행일: 2026년 9월 5일</p>
      </header>
      <div className="legal-summary">알고가요는 서비스 운영에 필요한 범위에서만 정보를 처리하며, 수집 목적과 이용 방법을 이해하기 쉽게 안내합니다.</div>
      <section><h2>1. 수집하는 정보</h2><p>알고가요는 회원가입 기능을 제공하지 않으며, 사이트에서 이름·전화번호·주소와 같은 개인정보를 직접 입력받지 않습니다. 이메일로 문의하는 경우 발신 이메일 주소, 문의 내용, 답변 과정에서 이용자가 자발적으로 제공한 정보가 처리될 수 있습니다.</p><p>사이트 접속 과정에서 IP 주소, 브라우저 종류, 방문 일시, 조회한 페이지, 기기 정보와 같은 접속 기록이 서버 또는 호스팅 사업자의 로그에 자동으로 남을 수 있습니다. 이 정보는 보안 유지, 오류 확인, 서비스 품질 개선에 사용됩니다.</p></section>
      <section><h2>2. 이용 목적과 보유 기간</h2><p>문의 정보는 질문 확인과 답변, 분쟁 대응을 위해 이용합니다. 문의가 끝난 뒤에는 관련 법령상 보관 의무가 있거나 분쟁 대응이 필요한 경우를 제외하고 지체 없이 삭제합니다. 접속 로그는 호스팅 및 보안 서비스 제공자의 정책에 따라 제한된 기간 보관될 수 있습니다.</p></section>
      <section><h2>3. 쿠키와 광고 서비스</h2><p>쿠키는 웹사이트가 브라우저에 저장하는 작은 정보 파일입니다. 알고가요는 사이트 기능, 보안, 방문 통계와 서비스 개선을 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.</p><p>향후 Google AdSense를 통해 광고를 제공하는 경우 Google과 제3자 광고 사업자가 쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로 광고를 게재할 수 있습니다. 이용자는 <a className="inline-link" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google 광고 설정</a>에서 맞춤 광고를 관리할 수 있으며, 브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다. 쿠키를 차단하면 일부 기능이 예상과 다르게 동작할 수 있습니다.</p></section>
      <section><h2>4. 외부 서비스와 국외 처리</h2><p>사이트는 배포, 도메인 연결, 보안과 성능 제공을 위해 Vercel 및 Cloudflare 서비스를 이용할 수 있습니다. 광고 또는 방문 통계 기능을 활성화하는 경우 Google 서비스가 추가될 수 있습니다. 이들 사업자는 서비스 제공 과정에서 접속 정보를 국외 서버에서 처리할 수 있으며, 각 사업자의 개인정보 보호정책과 계약 조건에 따라 정보를 보호합니다.</p></section>
      <section><h2>5. 제3자 제공</h2><p>알고가요는 이용자의 개인정보를 판매하지 않습니다. 법령에 근거한 요청이 있거나 서비스 제공에 필요한 처리 위탁이 있는 경우를 제외하고, 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p></section>
      <section><h2>6. 이용자의 권리</h2><p>이용자는 본인과 관련된 개인정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 이메일 문의 기록 삭제 등 요청은 아래 연락처로 보내주세요. 본인 확인이 필요한 경우 최소한의 정보를 추가로 요청할 수 있습니다.</p></section>
      <section><h2>7. 아동의 개인정보</h2><p>알고가요는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 아동이 보호자 동의 없이 개인정보를 보냈다고 판단되는 경우 연락해 주시면 확인 후 삭제하겠습니다.</p></section>
      <section><h2>8. 방침의 변경</h2><p>서비스 또는 관련 법령이 변경되면 이 방침을 수정할 수 있습니다. 중요한 변경은 시행 전에 사이트를 통해 알리고, 문서 상단의 시행일을 갱신합니다.</p></section>
      <section><h2>9. 문의</h2><p>개인정보 관련 문의: <a className="inline-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p><p>일반적인 사이트 문의는 <Link className="inline-link" href="/contact">문의 페이지</Link>에서도 확인할 수 있습니다.</p></section>
    </div>
  );
}

