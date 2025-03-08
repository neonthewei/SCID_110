import Hero from "../components/Hero"
import InteractivePlusGrid from "../components/InteractivePlusGrid"
import { Metadata } from "next"
import Script from "next/script"
import { generateMetadata } from "@/utils/metadata"

export const metadata: Metadata = generateMetadata({
  title: "實踐工設2025畢業展 | ˚Sense",
  description: "實踐大學工業產品設計學系2025畢業展覽「Sense」，探索感官體驗與創新設計的交會。展示學生創意作品、互動裝置與產品原型。",
  keywords: [
    "實踐大學首頁", "工業設計首頁", "畢業展首頁", "設計展覽", "Sense", 
    "感官設計", "設計作品", "2025畢業展", "實踐工設", "台灣設計展"
  ],
  pagePath: "/",
  imageUrl: "/og-image.png",
  imageAlt: "實踐工設2025畢業展 | ˚Sense",
  type: "website"
});

export default function Home() {
  return (
    <>
      <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "實踐工設2025畢業展 | ˚Sense",
          "description": "實踐大學工業產品設計學系2025年畢業展覽，展示創新設計作品、互動裝置與產品原型。探索新一代設計師如何透過感官體驗重新定義設計。",
          "startDate": "2025-05-01T10:00:00+08:00", // Update with actual dates
          "endDate": "2025-07-31T18:00:00+08:00", // Update with actual dates
          "location": {
            "@type": "Place",
            "name": "實踐工設110屆",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "台北市",
              "addressRegion": "台灣",
              "postalCode": "104",
              "streetAddress": "大直街70號" // Update with actual address
            }
          },
          "image": [
            `${process.env.SITE_URL || 'https://www.scid110.com'}/og-image.png`
          ],
          "organizer": {
            "@type": "Organization",
            "name": "實踐工設110屆",
            "url": process.env.SITE_URL || 'https://www.scid110.com'
          }
        })
      }} />
      <div className="pt-0 relative">
        <Hero />
        <div className="bg-[#F2F2F2]">
          <InteractivePlusGrid />
        </div>
      </div>
    </>
  )
}

