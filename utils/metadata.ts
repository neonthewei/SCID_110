import { Metadata } from 'next';

type MetadataProps = {
  title: string;
  description: string;
  keywords?: string[];
  pagePath?: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'event' | 'profile';
};

/**
 * Generate consistent metadata including Open Graph and Twitter card metadata for any page
 * @param props - Metadata properties
 * @returns Metadata object
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  pagePath = '/',
  imageUrl = '/og-image.png',
  imageAlt,
  type = 'website',
}: MetadataProps): Metadata {
  const siteUrl = process.env.SITE_URL || 'https://www.scid110.com';
  const fullUrl = `${siteUrl}${pagePath}`;
  const imageAltText = imageAlt || title;

  return {
    title,
    description,
    keywords: keywords,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      siteName: '實踐工設2025畢業展 | ˚Sense',
      locale: 'zh_TW',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAltText,
          type: 'image/png',
          secureUrl: `${siteUrl}${imageUrl}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@scid110',
      site: '@scid110',
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate article metadata for blog posts or news articles
 * @param props - Metadata properties plus article-specific properties
 * @returns Metadata object
 */
export function generateArticleMetadata({
  title,
  description,
  keywords = [],
  pagePath,
  imageUrl = '/og-image.png',
  imageAlt,
  publishedTime,
  modifiedTime,
  authors = ['實踐大學工業設計系'],
  section = '畢業展',
  tags = [],
}: MetadataProps & {
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    keywords,
    pagePath,
    imageUrl,
    imageAlt,
    type: 'article',
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      article: {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors,
        section,
        tags,
      },
    },
  };
}

/**
 * Generate event metadata for exhibition events
 * @param props - Metadata properties plus event-specific properties
 * @returns Metadata object
 */
export function generateEventMetadata({
  title,
  description,
  keywords = [],
  pagePath,
  imageUrl = '/og-image.png',
  imageAlt,
  startDate,
  endDate,
  location,
}: MetadataProps & {
  startDate: string;
  endDate: string;
  location: string;
}): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    keywords,
    pagePath,
    imageUrl,
    imageAlt,
    type: 'event',
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'event',
      // Note: OpenGraph doesn't have standard event properties like startDate
      // These would be handled in structured data instead
    },
  };
} 