import type { MetadataRoute } from "next";
import { categorySlugs, getCategoryLatestDate, getLatestUpdateDate, posts } from "@/lib/posts";
import { legalEffectiveDate, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = getLatestUpdateDate();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/articles`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: legalEffectiveDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, lastModified: legalEffectiveDate, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, lastModified: legalEffectiveDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified: legalEffectiveDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/disclaimer`, lastModified: legalEffectiveDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${siteConfig.url}/category/${slug}`,
    lastModified: getCategoryLatestDate(slug),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/articles/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${siteConfig.url}${post.image}`],
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
