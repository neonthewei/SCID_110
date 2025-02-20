import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import Header from "../components/Header"
import BackToTopButton from "../components/ScrollToTop"
import type React from "react"
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

const notoSansTC = Noto_Sans_TC({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "實踐工設2025畢業展 | ˚Sense",
  description: "Showcasing my design work and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSansTC.className}>
        <CustomCursor />
        <Header />
        <BackToTopButton />
        <main className="pt-16">{children}</main>
        <div className="h-16">
          <Footer />
        </div>
      </body>
    </html>
  )
}

