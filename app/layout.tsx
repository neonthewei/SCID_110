import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/Header"
import BackToTopButton from "../components/ScrollToTop"
import type React from "react"
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Design Graduate Portfolio",
  description: "Showcasing my design work and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <BackToTopButton />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

