import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://europropmoney.de';
const DEFAULT_OG_IMAGE = `${BASE_URL}/hero_cover_hd.jpg`;

/**
 * Enterprise programmatic metadata generator adhering strictly to Google SERP guidelines:
 * - Title tags <= 60 characters with high-intent transactional modifiers
 * - Meta descriptions <= 160 characters with explicit trust & CTA signals
 */
export function buildMetadata({
  title,
  description,
  canonicalPath = '/',
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = 'website',
}: SEOConfig): Metadata {
  const cleanTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const cleanDescription = description.length > 160 ? `${description.slice(0, 157)}...` : description;
  const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: cleanTitle,
    description: cleanDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: 'Euro Prop Money EU',
      type,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`],
    },
  };
}

/**
 * Enterprise JSON-LD Schema Generators for Google Rich Snippets & Knowledge Graph
 */

export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logoUrl?: string;
  telephone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  sameAs?: string[];
}

export function generateOrganizationSchema(props: OrganizationSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: props.name,
    url: props.url,
    logo: props.logoUrl || `${props.url}/favicon.svg`,
    telephone: props.telephone || '+49 30 8492 1000',
    email: props.email || 'dispatch@europropmoney.de',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address?.street || 'Stralauer Allee 7',
      addressLocality: props.address?.city || 'Berlin',
      addressRegion: props.address?.region || 'Berlin',
      postalCode: props.address?.postalCode || '10245',
      addressCountry: props.address?.country || 'DE',
    },
    sameAs: props.sameAs || [],
  };
}

export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  sku: string;
  price: number;
  currency?: string;
  ratingValue?: number;
  reviewCount?: number;
  availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
  brand?: string;
  url: string;
}

export function generateProductSchema(props: ProductSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    image: props.image,
    sku: props.sku,
    brand: {
      '@type': 'Brand',
      name: props.brand || 'Euro Prop Money EU',
    },
    offers: {
      '@type': 'Offer',
      url: props.url,
      priceCurrency: props.currency || 'EUR',
      price: props.price.toFixed(2),
      availability: `https://schema.org/${props.availability || 'InStock'}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Euro Prop Money EU',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: props.ratingValue || 4.9,
      reviewCount: props.reviewCount || 148,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
