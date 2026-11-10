import { MetadataRoute } from 'next';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blog';
import { KEYWORD_MAP } from '../data/keywordMapping';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://europropmoney.de';

  // Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Category Filter Views
  const categoryFilters = ['single', 'stunt', 'cases'];
  const categoryRoutes: MetadataRoute.Sitemap = categoryFilters.map((cat) => ({
    url: `${baseUrl}/shop?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Mapped Keyword Influx Landing Targets (Top High-Volume Searches)
  const keywordRoutes: MetadataRoute.Sitemap = KEYWORD_MAP.map((item) => ({
    url: `${baseUrl}/shop?q=${encodeURIComponent(item.keyword)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Individual Product Pages
  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Blog Article Pages
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...categoryRoutes, ...keywordRoutes, ...productPages, ...blogPages];
}
