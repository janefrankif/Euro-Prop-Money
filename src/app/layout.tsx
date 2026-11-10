import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';
import './globals.css';

const comicNeue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-comic-neue',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://europropmoney.de'),
  alternates: {
    canonical: '/',
  },
  title: 'Prop Money Euro | Cinema & Film Prop Banknote Stacks',
  description:
    'Buy realistic prop money euro notes certified under ECB Decision 2013/10. High-definition 8K non-reflective prop banknote stacks for movie sets, music videos, and TV productions.',
  keywords: [
    'prop money euro',
    'euro prop money',
    'prop money euro kaufen',
    'fake money euro kaufen',
    'buy prop money euro online',
    'prop euros',
    'fake money euro',
    'prop money euros',
    'buy prop money euro',
    'fake euro prop money',
    'buy prop money online',
    'cheap prop money',
    'fake cash stacks',
    'fake cash bundles',
    'fake euro money prop',
    'european prop money',
    'is prop money legal',
    'is it illegal to buy prop money',
    'is prop money counterfeit',
    '20 euro prop money',
    '50 euro prop money',
    '100 euro prop money',
    '500 euro prop money',
    'prop money euro with hologram',
    'prop money euro realistic',
    'prop money euro real size',
    'euro prop money realistic',
    'where to buy prop money euro',
    'prop money euro shop',
    'prop money euro real',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'UEEy6AntodYzc7Vc6Zcl5rtaQat9YfgYObO1YM23xrM',
  },
  openGraph: {
    title: 'Prop Money Euro | Cinema & Film Prop Banknote Stacks',
    description:
      'Cinema-grade, legally compliant Euro prop currency bundles, stacks, and production bags for film studios, directors, and content creators.',
    type: 'website',
    images: [
      {
        url: '/hero_cover_hd.jpg',
        width: 1200,
        height: 630,
        alt: 'prop money euro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prop Money Euro | Cinema & Film Prop Banknote Stacks',
    description:
      'Cinema-grade, legally compliant Euro prop currency bundles, stacks, and production bags for film studios, directors, and content creators.',
    images: [
      {
        url: '/hero_cover_hd.jpg',
        alt: 'prop money euro',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Euro Prop Money EU',
      url: 'https://europropmoney.de',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://europropmoney.de/shop?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
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
    },
  ];

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${comicNeue.variable} ${comicNeue.className} bg-white text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden`}
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
