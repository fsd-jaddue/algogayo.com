import type { MetadataRoute } from "next";
import { categoryOrder } from "@/lib/categories";
import { privacyPolicy, termsOfService } from "@/lib/legal";
import { getAllPosts, getLastModified, getPostsByCategory } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = getLastModified(posts) ?? privacyPolicy.effectiveDate;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/articles"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: privacyPolicy.effectiveDate, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: privacyPolicy.effectiveDate, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: privacyPolicy.effectiveDate, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: termsOfService.effectiveDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categoryOrder.map((slug) => ({
    url: absoluteUrl(`/category/${slug}`),
    lastModified: getLastModified(getPostsByCategory(slug)) ?? latest,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(post.image)],
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
