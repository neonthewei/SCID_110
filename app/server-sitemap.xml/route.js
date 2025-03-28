import { getServerSideSitemap } from "next-sitemap";
import {
  designers,
  getAllWorks,
  getDesignerByWorkId,
} from "../../data/designers";

export async function GET(request) {
  const baseUrl = process.env.SITE_URL
    ? process.env.SITE_URL.replace(/"/g, "")
    : "https://www.scid110.com";

  // Define your main sections
  const mainSections = [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/all-works", changefreq: "weekly", priority: 0.9 },
    { path: "/book-tour", changefreq: "weekly", priority: 0.8 },
    { path: "/buy-catalog", changefreq: "weekly", priority: 0.8 },
    { path: "/online-exhibition", changefreq: "weekly", priority: 0.9 },
  ];

  // Create entries for main sections
  const mainSectionPaths = mainSections.map((section) => ({
    loc: `${baseUrl}${section.path}`,
    lastmod: new Date().toISOString(),
    changefreq: section.changefreq,
    priority: section.priority,
  }));

  // Initialize dynamic paths with main sections
  let dynamicPaths = [...mainSectionPaths];

  try {
    // Get all designers
    const designerPaths = designers.map((designer) => ({
      loc: `${baseUrl}/designer/${designer.id}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));

    dynamicPaths.push(...designerPaths);

    // Get all works
    const works = getAllWorks();

    const workPaths = works.map((work) => ({
      loc: `${baseUrl}/work/${work.id}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));

    dynamicPaths.push(...workPaths);

    // Add exhibition pages
    const exhibitionPages = [
      { path: "/online-exhibition/milan", priority: 0.9 },
      { path: "/online-exhibition/shih-chien", priority: 0.9 },
      { path: "/online-exhibition/young-designers", priority: 0.9 },
    ];

    const exhibitionPaths = exhibitionPages.map((page) => ({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: page.priority,
    }));

    dynamicPaths.push(...exhibitionPaths);

    // Add category pages
    const categories = ["舒適巢", "溫工藝", "熱對話", "冷火花"];

    const categoryPaths = categories.map((category) => {
      // Convert category to URL-friendly format
      let categorySlug;
      switch (category) {
        case "舒適巢":
          categorySlug = "comfortable-nest";
          break;
        case "溫工藝":
          categorySlug = "warm-craft";
          break;
        case "熱對話":
          categorySlug = "hot-dialogue";
          break;
        case "冷火花":
          categorySlug = "cold-spark";
          break;
        default:
          categorySlug = encodeURIComponent(category);
      }

      return {
        loc: `${baseUrl}/all-works?category=${categorySlug}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.85,
      };
    });

    dynamicPaths.push(...categoryPaths);

    // Remove duplicates based on loc
    dynamicPaths = Array.from(
      new Map(dynamicPaths.map((item) => [item.loc, item])).values()
    );
  } catch (error) {
    console.error("Error generating dynamic sitemap paths:", error);
  }

  return getServerSideSitemap(dynamicPaths);
}
