import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function cdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function toRfc822(date: string) {
  return new Date(`${date}T09:00:00+09:00`).toUTCString();
}

export function GET() {
  const posts = getAllPosts().slice(0, 20);
  const lastBuildDate = posts[0] ? toRfc822(posts[0].updatedAt ?? posts[0].publishedAt) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/articles/${post.slug}`);
      const html = [post.body.intro, ...post.body.sections.map((section) => section.html)].filter(Boolean).join("\n");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
      <category>${escapeXml(post.categoryLabel)}</category>
      <dc:creator>${escapeXml(siteConfig.author.name)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
      <content:encoded>${cdata(html)}</content:encoded>
      <enclosure url="${absoluteUrl(post.image)}" type="${post.image.endsWith(".png") ? "image/png" : "image/jpeg"}" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-kr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
