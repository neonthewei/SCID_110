export default function robots() {
  const siteUrl = process.env.SITE_URL || 'https://scid-110.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
} 