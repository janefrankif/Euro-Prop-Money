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

export default function CatchAllRoute() {
  return <AppWrapper />;
}
