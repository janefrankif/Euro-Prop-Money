import AppWrapper from '../AppWrapper';

export function generateStaticParams() {
  return [
    { slug: ['shop'] },
    { slug: ['about'] },
    { slug: ['contact'] },
    { slug: ['blog'] },
    { slug: ['compliance'] },
  ];
}

export const dynamicParams = true;

export default async function CatchAllRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const pathname = '/' + slugArray.join('/');

  const resolvedSearch = searchParams ? await searchParams : {};
  const queryParts: string[] = [];
  for (const [key, value] of Object.entries(resolvedSearch)) {
    if (typeof value === 'string') {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    } else if (Array.isArray(value)) {
      value.forEach((v) => queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
    }
  }
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const fullPath = pathname + queryString;

  return <AppWrapper initialPath={fullPath} />;
}
