import { NextResponse } from 'next/server';
import { PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://europropmoney.de';
  const lastMod = new Date().toISOString();

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/shop`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/compliance`, priority: '0.8', changefreq: 'monthly' },
  ];

  const categoryFilters = ['single', 'stunt', 'cases'].map((cat) => ({
    url: `${baseUrl}/shop?category=${cat}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug || product.id}`,
    priority: '0.85',
    changefreq: 'weekly',
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    priority: '0.75',
    changefreq: 'monthly',
  }));

  const allUrls = [...staticPages, ...categoryFilters, ...productPages, ...blogPages];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
