"use client"
import { useEffect, useState } from "react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { usePathname } from 'next/navigation'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isBuyCatalogPage = pathname === '/buy-catalog'
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches

  // 如果是手機版購買頁，直接不顯示
  if (isBuyCatalogPage && isMobile) {
    return null
  }

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const bottomPosition = isBuyCatalogPage ? 2 : 2 // 移除手機版的判斷，因為手機版已經不顯示了

  return (
    <>
      <button
        onClick={scrollToTop}
        style={{ bottom: `${bottomPosition}rem` }}
        className={`fixed p-3 bg-black dark:bg-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 z-[999] right-8
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
        `}
        aria-label="回到頂部"
      >
        <ChevronUpIcon className="h-6 w-6 text-white dark:text-black" />
      </button>
    </>
  )
}

