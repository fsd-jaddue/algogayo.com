import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { categories, categoryOrder } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const description = "알고가요가 어떤 사이트인지, 누가 어떤 기준으로 글을 쓰는지, 광고와 이미지는 어떻게 다루는지 소개합니다.";

export const metadata: Metadata = {
  title: "사이트 소개",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "사이트 소개 | 알고가요", description, url: "/about" },
};

const principles = [
  {
    title: "결론을 먼저 씁니다",
    body: "핵심을 앞에 두고, 왜 그런지와 예시는 뒤에서 설명합니다. 바쁜 사람이 앞부분만 읽어도 다음 행동을 정할 수 있어야 한다고 생각합니다.",
  },
  {
    title: "따라 할 수 있는 순서로 씁니다",
    body: "막연한 조언보다 무엇부터 확인하고 어떤 기준으로 결정할지 순서로 적습니다. 글 끝에는 확인용 체크리스트를 둡니다.",
  },
  {
    title: "조건과 예외를 숨기지 않습니다",
    body: "제도, 요금, 보험, 안전처럼 사람마다 결과가 달라지는 내용은 공식 안내를 우선하고, 확인해야 할 점과 예외를 함께 밝힙니다.",
  },
  {
    title: "과장하지 않습니다",
    body: "‘무조건’, ‘누구나’, ‘완벽하게’ 같은 표현을 경계합니다. 특정 상품이나 서비스를 추천해서 얻는 대가가 없으며, 있다면 그 사실을 글에 표시합니다.",
  },
];

export default function AboutPage() {
  const { author } = siteConfig;
  const postCount = getAllPosts().length;
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "사이트 소개", href: "/about" },
  ];

  return (
    <div className="shell shell--narrow prose-page">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker="About"
        title="알고가요 소개"
        narrow
        lead={
          <p>
            ‘알고 가요’는 어디든 미리 알고 가면 덜 헤맨다는 뜻입니다. 생활비, 디지털 습관, 여행 준비처럼 누구나 겪지만
            매번 검색하게 되는 일을, 한 번 읽고 바로 따라 할 수 있는 순서로 정리합니다.
          </p>
        }
      />

      <section className="prose-section" aria-labelledby="about-topics">
        <h2 id="about-topics">다루는 주제</h2>
        <p>
          현재 세 가지 주제에 집중해 {postCount}편의 글을 올렸습니다. 서로 달라 보이지만 모두 ‘선택지를 줄이고 반복할
          수 있는 기준을 만드는 일’과 연결되어 있습니다.
        </p>
        <ul className="topic-list">
          {categoryOrder.map((slug) => {
            const category = categories[slug];
            return (
              <li key={slug}>
                <Link href={`/category/${slug}`}>
                  <strong>{category.name}</strong>
                  <span>{category.intro}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="prose-section" aria-labelledby="about-author">
        <h2 id="about-author">운영자</h2>
        <div className="author-card">
          <div className="author-card__mark" aria-hidden="true">
            {author.name.slice(0, 1)}
          </div>
          <div>
            <p className="author-card__name">
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </p>
            <p>
              글은 운영자가 직접 자료를 찾아 정리하고, 실제로 해 본 뒤 순서를 다듬어 씁니다. 잘못된 내용이나 오래된
              정보를 발견하면 <Link href="/contact">문의 페이지</Link>로 알려주세요. 확인 후 글을 고치고 수정일을
              표시합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="about-principles">
        <h2 id="about-principles">편집 원칙</h2>
        <ol className="principle-list">
          {principles.map((item, index) => (
            <li key={item.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="prose-section" aria-labelledby="about-content">
        <h2 id="about-content">콘텐츠와 이미지</h2>
        <p>
          모든 글은 알고가요를 위해 새로 쓴 것이며 다른 매체의 글을 옮기거나 짜깁기하지 않습니다. 인용이 필요할 때는
          출처를 밝힙니다. 글의 내용은 일반적인 정보 제공을 목적으로 하며, 개인의 상황에 대한 법률·의료·세무·재무
          자문을 대신하지 않습니다.
        </p>
        <p>
          글에 쓰인 대표 이미지는 알고가요가 사이트용으로 제작한 이미지입니다. 실제 제품, 매장, 인물을 촬영한 것이
          아니며 특정 브랜드나 서비스와 관계가 없습니다. 외부 스톡 사진이나 타인의 저작물을 무단으로 사용하지 않습니다.
        </p>
      </section>

      <section className="prose-section" aria-labelledby="about-ads">
        <h2 id="about-ads">광고 게재 안내</h2>
        <p>
          알고가요는 운영 비용을 충당하기 위해 Google AdSense 광고를 게재하거나 게재할 수 있습니다. 광고의 내용은
          Google이 자동으로 선정하며 알고가요가 특정 광고주나 상품을 직접 추천하는 것이 아닙니다. 광고는 본문과
          구분되는 위치에 표시되며, 광고를 보거나 클릭하지 않아도 모든 글을 읽을 수 있습니다.
        </p>
        <p>
          광고와 관련한 쿠키 사용과 맞춤 광고 해제 방법은 <Link href="/privacy">개인정보처리방침</Link>에서 확인할 수
          있습니다. 제휴 링크를 사용하게 되면 해당 글에 그 사실을 표시하겠습니다.
        </p>
      </section>

      <section className="prose-section" aria-labelledby="about-contact">
        <h2 id="about-contact">문의</h2>
        <p>
          글 제안, 오류 신고, 콘텐츠 이용 문의는 <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>으로
          보내주세요. 자세한 안내는 <Link href="/contact">문의 페이지</Link>에 있습니다.
        </p>
      </section>

      <JsonLd data={personJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
