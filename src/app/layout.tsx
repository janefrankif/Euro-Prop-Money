import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'CINE EURO - Studio Grade Prop Money',
  description:
    'Cinema-grade, legally compliant Euro prop currency bundles, stacks, and production bags for film studios, directors, and content creators. 100% legal compliance under ECB Decision 2013/10.',
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'UEEy6AntodYzc7Vc6Zcl5rtaQat9YfgYObO1YM23xrM',
  },
  openGraph: {
    title: 'CINE EURO - Studio Grade Prop Money',
    description:
      'Cinema-grade, legally compliant Euro prop currency bundles, stacks, and production bags for film studios, directors, and content creators.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CINE EURO - Studio Grade Prop Money',
    telephone: '+49 30 8492 1000',
    email: 'dispatch@europropmoney.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stralauer Allee 7',
      postalCode: '10245',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin-Bezirk Friedrichshain-Kreuzberg',
      addressCountry: 'DE',
    },
    description:
      'Specialist European supplier of realistic, camera-calibrated Euro prop currency bundles and stunt money for television and motion pictures.',
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="google-site-verification" content="UEEy6AntodYzc7Vc6Zcl5rtaQat9YfgYObO1YM23xrM" />
      </head>
      <body
        className="bg-white text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950"
        style={{
          fontFamily: "'Comic Sans MS', 'Comic Sans', 'Comic Neue', cursive, sans-serif",
        }}
      >
        <script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
