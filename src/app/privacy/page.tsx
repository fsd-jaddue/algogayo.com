import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { formatDate, privacyPolicy } from "@/lib/legal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const description = "알고가요가 처리하는 개인정보의 항목, 목적, 보유 기간, 쿠키와 광고(Google AdSense) 관련 고지, 이용자의 권리와 보호책임자 연락처를 안내합니다.";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "개인정보처리방침 | 알고가요", description, url: "/privacy" },
};

const processors = [
  {
    name: "Vercel Inc.",
    country: "미국",
    task: "웹사이트 호스팅과 배포",
    items: "접속 기록(IP 주소, 브라우저 정보, 접속 일시, 요청한 페이지)",
  },
  {
    name: "Cloudflare, Inc.",
    country: "미국",
    task: "도메인(DNS) 관리, 네트워크 보안, 문의 이메일 전달",
    items: "접속 기록, 문의 이메일(전달 과정)",
  },
  {
    name: "Google LLC",
    country: "미국",
    task: "광고 게재(Google AdSense), 검색 색인 도구(Search Console)",
    items: "쿠키와 광고 식별자, 접속 기록",
  },
];

const remedies = [
  { name: "개인정보침해신고센터", contact: "국번 없이 118", url: "https://privacy.kisa.or.kr" },
  { name: "개인정보분쟁조정위원회", contact: "국번 없이 1833-6972", url: "https://www.kopico.go.kr" },
  { name: "대검찰청 사이버수사과", contact: "국번 없이 1301", url: "https://www.spo.go.kr" },
  { name: "경찰청 사이버수사국", contact: "국번 없이 182", url: "https://ecrm.police.go.kr" },
];

export default function PrivacyPage() {
  const { author, email } = siteConfig;
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "개인정보처리방침", href: "/privacy" },
  ];

  return (
    <div className="shell shell--narrow legal">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker="Privacy Policy"
        title="개인정보처리방침"
        narrow
        lead={
          <p className="legal__meta">
            시행일: <time dateTime={privacyPolicy.effectiveDate}>{formatDate(privacyPolicy.effectiveDate)}</time>
          </p>
        }
      />
      <p className="legal__summary">
        알고가요는 회원가입이나 개인정보 입력 양식이 없는 정보 제공 사이트입니다. 처리하는 개인정보는 이메일 문의 내용과
        접속 과정에서 자동으로 남는 기록, 그리고 광고와 방문 통계를 위한 쿠키로 한정됩니다. 이 방침은 「개인정보
        보호법」 제30조에 따라 그 내용을 알기 쉽게 안내합니다.
      </p>

      <section aria-labelledby="p1">
        <h2 id="p1">1. 적용 범위와 개인정보처리자</h2>
        <p>
          이 방침은 알고가요(algogayo.com, 이하 ‘사이트’)를 이용하는 과정에서 처리되는 개인정보에 적용됩니다. 사이트는
          운영자(필명 {author.name})가 개인으로 운영하는 정보 제공 웹사이트이며, 회원가입·로그인·결제 기능을 제공하지
          않고 이름, 전화번호, 주소 같은 정보를 입력받는 양식을 두지 않습니다.
        </p>
      </section>

      <section aria-labelledby="p2">
        <h2 id="p2">2. 수집하는 개인정보의 항목과 방법</h2>
        <p>
          <strong>가. 이메일 문의:</strong> 이용자가 {email}으로 문의를 보내는 경우 발신 이메일 주소, 문의 내용, 답변
          과정에서 이용자가 스스로 제공한 정보가 처리됩니다.
        </p>
        <p>
          <strong>나. 접속 기록(자동 수집):</strong> 사이트에 접속하면 IP 주소, 브라우저 종류와 버전, 운영체제, 접속
          일시, 조회한 페이지 주소, 유입 경로, 기기 종류 같은 정보가 호스팅 및 네트워크 서비스 제공자의 서버 로그에
          자동으로 남을 수 있습니다. 운영자는 이 기록을 별도로 수집하거나 저장하지 않습니다.
        </p>
        <p>
          <strong>다. 쿠키 등 자동 수집 장치:</strong> 제8조와 제9조에서 설명합니다.
        </p>
      </section>

      <section aria-labelledby="p3">
        <h2 id="p3">3. 개인정보의 처리 목적</h2>
        <ul>
          <li>문의 내용 확인과 답변, 분쟁이 생겼을 때의 대응</li>
          <li>서비스의 안정적인 운영, 보안 침해 대응, 오류 확인</li>
          <li>방문 통계 확인과 서비스 개선</li>
          <li>광고 게재와 광고 성과 측정(제9조)</li>
        </ul>
      </section>

      <section aria-labelledby="p4">
        <h2 id="p4">4. 개인정보의 보유 및 이용 기간</h2>
        <p>
          <strong>문의 정보:</strong> 답변이 끝난 날부터 1년간 보관한 뒤 삭제합니다. 이용자가 삭제를 요청하면 관련
          법령에 따라 보관해야 하는 경우를 제외하고 지체 없이 삭제합니다.
        </p>
        <p>
          <strong>접속 기록:</strong> 호스팅 및 네트워크 서비스 제공자의 보관 정책에 따르며, 운영자가 별도로 보관하지
          않습니다.
        </p>
        <p>
          <strong>쿠키:</strong> 쿠키마다 정해진 만료 기간까지 이용자의 브라우저에 저장되며, 이용자가 언제든 삭제할 수
          있습니다.
        </p>
      </section>

      <section aria-labelledby="p5">
        <h2 id="p5">5. 개인정보의 파기 절차와 방법</h2>
        <p>
          보유 기간이 지나거나 처리 목적이 달성되면 지체 없이 파기합니다. 전자 파일 형태의 정보는 복구할 수 없는
          방법으로 삭제하고, 이메일은 메일함에서 삭제한 뒤 휴지통을 비웁니다. 종이에 출력한 정보가 있다면 분쇄하거나
          소각합니다.
        </p>
      </section>

      <section aria-labelledby="p6">
        <h2 id="p6">6. 개인정보의 제3자 제공</h2>
        <p>
          운영자는 이용자의 개인정보를 판매하지 않으며, 법령에 근거한 요청이 있는 경우를 제외하고 이용자의 동의 없이
          제3자에게 제공하지 않습니다.
        </p>
      </section>

      <section aria-labelledby="p7">
        <h2 id="p7">7. 개인정보 처리의 위탁과 국외 이전</h2>
        <p>
          사이트 운영을 위해 아래 서비스 제공자에게 업무를 위탁하며, 이 과정에서 접속 정보가 국외(미국) 서버에서
          처리될 수 있습니다. 이전은 이용자가 사이트에 접속하거나 문의를 보내는 시점에 네트워크를 통해 이루어지며, 각
          제공자는 자체 개인정보 보호정책과 계약 조건에 따라 정보를 보호합니다. 보유 기간은 각 제공자의 정책을
          따릅니다.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">수탁자</th>
                <th scope="col">국가</th>
                <th scope="col">위탁 업무</th>
                <th scope="col">이전되는 항목</th>
              </tr>
            </thead>
            <tbody>
              {processors.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.country}</td>
                  <td>{row.task}</td>
                  <td>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          이용자는 브라우저에서 쿠키를 차단하거나 사이트 이용을 중단하는 방법으로 국외 이전을 거부할 수 있습니다. 다만
          이 경우 사이트의 일부 기능이 제한될 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="p8">
        <h2 id="p8">8. 쿠키 등 자동 수집 장치의 설치·운영과 거부</h2>
        <p>
          쿠키는 웹사이트가 이용자의 브라우저에 저장하는 작은 텍스트 파일입니다. 사이트는 기본 기능 제공, 보안, 방문
          통계, 광고 게재를 위해 쿠키 또는 이와 비슷한 기술을 사용할 수 있습니다.
        </p>
        <p>이용자는 브라우저 설정에서 쿠키 저장을 거부하거나 저장된 쿠키를 삭제할 수 있습니다.</p>
        <ul>
          <li>Chrome: 설정 → 개인 정보 보호 및 보안 → 서드 파티 쿠키 또는 사이트 데이터</li>
          <li>Safari(iPhone): 설정 → Safari → 모든 쿠키 차단</li>
          <li>Samsung Internet: 인터넷 설정 → 개인정보 보호 → 쿠키 차단</li>
        </ul>
        <p>쿠키를 차단하면 일부 기능이 예상과 다르게 동작할 수 있습니다.</p>
      </section>

      <section aria-labelledby="p9">
        <h2 id="p9">9. 광고 서비스(Google AdSense)와 맞춤 광고</h2>
        <p>사이트는 Google AdSense를 통해 광고를 게재하거나 게재할 수 있습니다. 이와 관련해 다음 사항을 알려드립니다.</p>
        <ul>
          <li>Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자가 이 사이트 또는 다른 웹사이트를 이전에 방문한 기록을 바탕으로 광고를 게재합니다.</li>
          <li>Google은 광고 쿠키를 사용하여 이용자의 사이트 방문 기록을 바탕으로 Google과 Google의 파트너가 광고를 게재할 수 있도록 합니다.</li>
          <li>
            이용자는{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 해제할 수 있으며,{" "}
            <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            에서 제3자 공급업체의 맞춤 광고용 쿠키 사용을 해제할 수 있습니다.
          </li>
          <li>
            Google이 광고 서비스를 이용하는 사이트에서 정보를 사용하는 방법은{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              Google의 안내 페이지
            </a>
            에서 확인할 수 있습니다.
          </li>
        </ul>
        <p>광고의 내용과 광고를 통해 연결되는 외부 사이트의 개인정보 처리는 해당 광고주가 책임집니다.</p>
      </section>

      <section aria-labelledby="p10">
        <h2 id="p10">10. 정보주체의 권리와 행사 방법</h2>
        <p>
          이용자는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다. 요청은 제13조의 연락처로
          보내주시면 본인 확인 후 요청을 받은 날부터 10일 이내에 처리 결과를 알려드립니다. 법정대리인이나 위임을 받은
          사람이 요청하는 경우 위임 관계를 확인할 수 있는 서류를 요청할 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="p11">
        <h2 id="p11">11. 만 14세 미만 아동의 개인정보</h2>
        <p>
          사이트는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 아동이 법정대리인의 동의 없이 개인정보를
          보냈다고 판단되면 연락해 주세요. 확인 후 지체 없이 삭제하겠습니다.
        </p>
      </section>

      <section aria-labelledby="p12">
        <h2 id="p12">12. 개인정보의 안전성 확보 조치</h2>
        <ul>
          <li>사이트의 모든 통신은 HTTPS로 암호화됩니다.</li>
          <li>문의 이메일에 접근할 수 있는 사람은 운영자 1인으로 제한하며, 메일 계정에 2단계 인증을 적용합니다.</li>
          <li>호스팅 및 네트워크 서비스 제공자의 보안 정책과 접근 통제를 이용합니다.</li>
        </ul>
      </section>

      <section aria-labelledby="p13">
        <h2 id="p13">13. 개인정보 보호책임자</h2>
        <p>개인정보 처리에 관한 문의, 불만 처리, 피해 구제 요청은 아래 연락처로 보내주세요.</p>
        <ul>
          <li>성명: {author.name}(필명)</li>
          <li>직책: {author.role}</li>
          <li>
            연락처: <a href={`mailto:${email}`}>{email}</a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="p14">
        <h2 id="p14">14. 권익침해 구제 방법</h2>
        <p>개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수 있습니다.</p>
        <ul>
          {remedies.map((item) => (
            <li key={item.name}>
              {item.name}: {item.contact},{" "}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="p15">
        <h2 id="p15">15. 방침의 변경과 개정 이력</h2>
        <p>
          법령이나 서비스 내용이 바뀌면 이 방침을 수정할 수 있습니다. 변경 사항은 시행 7일 전부터 사이트에 공지하고,
          문서 상단의 시행일을 갱신합니다.
        </p>
        <ul className="legal__history">
          {privacyPolicy.history.map((item) => (
            <li key={item.date}>
              <time dateTime={item.date}>{formatDate(item.date)}</time> — {item.note}
            </li>
          ))}
        </ul>
        <p>
          사이트 이용 조건은 <Link href="/terms">이용약관</Link>을 확인해 주세요.
        </p>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
