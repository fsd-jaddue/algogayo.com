import { toRfc822 } from "@/lib/format";
import { getLatestUpdateDate, posts } from "@/lib/posts";
import { siteAuthor, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value.replace(/[<>&"']/g, (char) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char] ?? char,
  );

export function GET() {
  const feedUrl = `${siteConfig.url}/feed.xml`;
  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/articles/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
      <category>${escapeXml(post.categoryLabel)}</category>
      <dc:creator>${escapeXml(siteAuthor.name)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
      <enclosure url="${siteConfig.url}${post.image}" type="image/webp" length="0" />
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${toRfc822(getLatestUpdateDate())}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteConfig.url}/logo.png</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${siteConfig.url}</link>
    </image>${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
