import type { MetadataRoute } from "next";
import { categoryInfo, posts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: "2026-09-05", changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/articles`, lastModified: "2026-09-05", changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: "2026-09-05", changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified: "2026-09-05", changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.keys(categoryInfo).map((slug) => ({
    url: `${siteConfig.url}/category/${slug}`,
    lastModified: "2026-09-05",
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

