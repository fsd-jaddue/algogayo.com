import type { Metadata } from "next";
import Link from "next/link";
import { AnnualPlanCalculator, SwitchingCalculator, UnitPriceCalculator } from "@/components/article-tools";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { PageHead } from "@/components/page-head";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/seo";

const description = "단위 가격, 고정비 전환, 구독 연간 결제 손익분기를 내 숫자로 계산하는 도구와 글별 빈 기록표를 모았습니다.";

export const metadata: Metadata = {
  title: "계산기와 기록표",
  description,
  alternates: { canonical: "/tools" },
  openGraph: { title: "계산기와 기록표 | 알고가요", description, url: "/tools" },
};

/** 계산기마다 계산 원리와 예시를 설명하는 글이 하나씩 있다. */
const calculators = [
  { slug: "grocery-unit-price", Tool: UnitPriceCalculator },
  { slug: "fixed-expense-review", Tool: SwitchingCalculator },
  { slug: "subscription-annual-vs-monthly", Tool: AnnualPlanCalculator },
];

export default function ToolsPage() {
  const crumbs = [
    { name: "홈", href: "/" },
    { name: "계산기와 기록표", href: "/tools" },
  ];
  const worksheets = getAllPosts().filter((post) => post.checklist.length > 0);

  return (
    <div className="shell shell--narrow prose-page">
      <Breadcrumb items={crumbs} />
      <PageHead
        kicker="Tools"
        title="계산기와 기록표"
        narrow
        lead={
          <p>
            글에서 설명한 계산을 내 숫자로 바로 해 볼 수 있게 모았습니다. 입력값은 브라우저 안에서만 계산하며 서버로 보내거나
            저장하지 않습니다.
          </p>
        }
      />

      {calculators.map(({ slug, Tool }) => {
        const post = getPostBySlug(slug);
        return (
          <div key={slug}>
            <Tool />
            {post && (
              <p className="tool-source">
                계산 원리와 예시: <Link href={`/articles/${slug}`}>{post.title}</Link>
              </p>
            )}
          </div>
        );
      })}

      <section className="prose-section" aria-labelledby="worksheets-title">
        <h2 id="worksheets-title">글별 빈 기록표</h2>
        <p>
          체크리스트가 있는 글마다 내 상황을 적어 볼 수 있는 텍스트 기록표를 둡니다. 비밀번호나 카드번호 같은 민감한 정보는
          적지 마세요.
        </p>
        <ul className="worksheet-list">
          {worksheets.map((post) => (
            <li key={post.slug}>
              <Link href={`/articles/${post.slug}`}>{post.title}</Link>
              <a className="text-link" href={`/worksheets/${post.slug}.txt`} download>
                기록표 (.txt)
              </a>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </div>
  );
}
