import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import Header from "../components/Header"
import BackToTopButton from "../components/ScrollToTop"
import type React from "react"
import Footer from '@/components/Footer'
import ExhibitionOverlay from '@/components/ExhibitionOverlay'

const notoSansTC = Noto_Sans_TC({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "實踐工設2025畢業展 | ˚Sense",
  description: "實踐大學工業產品設計學系2025年畢業展覽，展示創新設計作品、互動裝置與產品原型。探索新一代設計師如何透過感官體驗重新定義設計。",
  keywords: [
    "實踐大學", "工業設計", "畢業展", "設計展覽", "Sense", "感官設計",
    "產品設計", "互動設計", "設計作品", "2025畢業展", "實踐工設", 
    "設計學生", "創新設計", "台灣設計", "設計教育", "Shih Chien University",
    "Industrial Design", "Graduation Exhibition", "Design Exhibition"
  ],
  authors: [{ name: "實踐工設110屆" }],
  creator: "實踐工設110屆",
  publisher: "實踐工設110屆",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'https://www.scid110.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "實踐工設2025畢業展 | ˚Sense",
    description: "實踐大學工業產品設計學系2025年畢業展覽，展示創新設計作品、互動裝置與產品原型。探索新一代設計師如何透過感官體驗重新定義設計。",
    url: process.env.SITE_URL || 'https://www.scid110.com',
    siteName: "實踐工設2025畢業展 | ˚Sense",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: `${process.env.SITE_URL || 'https://www.scid110.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "實踐工設2025畢業展 | ˚Sense",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "實踐工設2025畢業展 | ˚Sense",
    description: "實踐大學工業產品設計學系2025年畢業展覽，展示創新設計作品、互動裝置與產品原型。",
    images: [`${process.env.SITE_URL || 'https://www.scid110.com'}/og-image.png`],
  },
  verification: {
    google: "5WSeA982k7K2fESj0f1-gmbNNkQnf5IvxophyfelzIE",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="實踐工設2025畢業展 | ˚Sense" />
        <meta property="og:locale:alternate" content="en_US" />
      </head>
      <body className={notoSansTC.className}>
        <Header />
        <BackToTopButton />
        <ExhibitionOverlay />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

