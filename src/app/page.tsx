import AppWrapper from './AppWrapper';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
  const fullPath = '/' + queryString;

  return <AppWrapper initialPath={fullPath} />;
}
