import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request) {
  const baseUrl = process.env.SITE_URL || 'https://www.scid110.com';
  
  // Define your main sections
  const mainSections = [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/all-works', changefreq: 'weekly', priority: 0.9 },
    { path: '/book-tour', changefreq: 'weekly', priority: 0.8 },
    { path: '/buy-catalog', changefreq: 'weekly', priority: 0.8 },
    { path: '/online-exhibition', changefreq: 'weekly', priority: 0.9 },
  ];

  // Create entries for main sections
  const mainSectionPaths = mainSections.map(section => ({
    loc: `${baseUrl}${section.path}`,
    lastmod: new Date().toISOString(),
    changefreq: section.changefreq,
    priority: section.priority,
  }));

  // Method to source dynamic URLs
  let dynamicPaths = [...mainSectionPaths];

  // You can fetch dynamic routes from your database or API here
  // For example, if you have a way to fetch works:
  try {
    // This is a placeholder - replace with your actual data fetching logic
    // const works = await fetch(`${baseUrl}/api/works`).then(res => res.json());
    
    // For now, let's add some example work paths
    // In a real implementation, you would replace this with actual data
    const exampleWorks = [
      { slug: 'project-1', updatedAt: new Date().toISOString() },
      { slug: 'project-2', updatedAt: new Date().toISOString() },
      { slug: 'project-3', updatedAt: new Date().toISOString() },
    ];
    
    const workPaths = exampleWorks.map(work => ({
      loc: `${baseUrl}/work/${work.slug}`,
      lastmod: work.updatedAt,
      changefreq: 'monthly',
      priority: 0.7,
    }));
    
    dynamicPaths.push(...workPaths);
    
    // Similarly for designers
    const exampleDesigners = [
      { slug: 'designer-1', updatedAt: new Date().toISOString() },
      { slug: 'designer-2', updatedAt: new Date().toISOString() },
      { slug: 'designer-3', updatedAt: new Date().toISOString() },
    ];
    
    const designerPaths = exampleDesigners.map(designer => ({
      loc: `${baseUrl}/designer/${designer.slug}`,
      lastmod: designer.updatedAt,
      changefreq: 'monthly',
      priority: 0.7,
    }));
    
    dynamicPaths.push(...designerPaths);
  } catch (error) {
    console.error('Error generating dynamic sitemap paths:', error);
  }

  return getServerSideSitemap(dynamicPaths);
} 