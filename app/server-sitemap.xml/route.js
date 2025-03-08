import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request) {
  // Method to source dynamic URLs
  const dynamicPaths = [
    // Add your dynamic paths here, for example:
    // { loc: 'https://scid-110.vercel.app/work/project-1', lastmod: new Date().toISOString() },
    // { loc: 'https://scid-110.vercel.app/designer/designer-1', lastmod: new Date().toISOString() },
  ];

  // You can fetch dynamic routes from your database or API here
  // For example:
  // const works = await fetchWorks();
  // const workPaths = works.map(work => ({
  //   loc: `https://scid-110.vercel.app/work/${work.slug}`,
  //   lastmod: work.updatedAt,
  // }));
  // dynamicPaths.push(...workPaths);

  return getServerSideSitemap(dynamicPaths);
} 