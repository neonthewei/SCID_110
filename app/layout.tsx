import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import Header from "../components/Header"
import BackToTopButton from "../components/ScrollToTop"
import type React from "react"
import Footer from '@/components/Footer'

const notoSansTC = Noto_Sans_TC({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "實踐工設2025畢業展 | ˚Sense",
  description: "Showcasing my design work and skills",
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
    <html lang="en">
      <body className={notoSansTC.className}>
        <Header />
        <BackToTopButton />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

