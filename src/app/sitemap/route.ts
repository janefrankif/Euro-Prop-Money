import { NextResponse } from 'next/server';
import { GET as getSitemapXml } from '../sitemap.xml/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return getSitemapXml();
}
