/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://scid-110.vercel.app', // Updated to match your actual domain
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://scid-110.vercel.app/server-sitemap.xml', // Updated to match your actual domain
    ],
  },
  exclude: ['/api/*', '/admin/*'], // Add paths you want to exclude
  generateIndexSitemap: false,
  outDir: 'public',
} 