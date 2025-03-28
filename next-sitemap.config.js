/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL
    ? process.env.SITE_URL.replace(/"/g, "")
    : "https://www.scid110.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${
        process.env.SITE_URL
          ? process.env.SITE_URL.replace(/"/g, "")
          : "https://www.scid110.com"
      }/server-sitemap.xml`,
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*"],
      },
    ],
  },
  exclude: ["/api/*", "/admin/*", "/server-sitemap.xml"],
  generateIndexSitemap: true,
  outDir: "public",
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  transform: async (config, path) => {
    // Custom transform function to set priorities based on path
    let priority = config.priority; // Default priority from config

    // Set higher priority for important pages
    if (path === "/") priority = 1.0;
    else if (path.startsWith("/all-works")) priority = 0.9;
    else if (path.startsWith("/online-exhibition")) priority = 0.9;
    else if (path.startsWith("/designer/")) priority = 0.8;
    else if (path.startsWith("/work/")) priority = 0.8;
    else if (path.startsWith("/book-tour")) priority = 0.7;
    else if (path.startsWith("/buy-catalog")) priority = 0.7;

    // Set changefreq based on path
    let changefreq = config.changefreq;
    if (path === "/") changefreq = "daily";

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
