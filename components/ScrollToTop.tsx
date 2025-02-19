"use client"
import { useEffect, useState, useRef } from "react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { usePathname } from 'next/navigation'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [bottomPosition, setBottomPosition] = useState(8)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const isBuyCatalogPage = pathname === '/buy-catalog'
  const footerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show button when page is scrolled up to given distance and adjust position based on footer
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }

    // Adjust position based on footer visibility
    const footer = document.querySelector('footer')
    if (footer && isVisible) {
      const footerRect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const defaultBottom = isBuyCatalogPage 
        ? (isMobile ? 7 : 2) // Mobile: 7rem, Desktop: 5rem for buy catalog page
        : 2 // Other pages: 2rem
      
      if (footerRect.top < viewportHeight) {
        // Calculate how much of the footer is visible
        const footerVisibleHeight = viewportHeight - footerRect.top
        // Add extra padding (2rem = 32px) to keep some space between button and footer
        const maxBottom = isBuyCatalogPage && isMobile ? 9.5 : 20
        const newBottom = Math.min((footerVisibleHeight + 32) / 16, maxBottom)
        setBottomPosition(newBottom)
      } else {
        setBottomPosition(defaultBottom)
      }
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
  }, [isVisible, isBuyCatalogPage])

  return (
    <>
      {isVisible && 
        <button
          onClick={scrollToTop}
          style={{ bottom: `${bottomPosition}rem` }}
          className={`fixed p-3 bg-black dark:bg-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 z-[60] right-8`}
          aria-label="回到頂部"
        >
          <ChevronUpIcon className="h-6 w-6 text-white dark:text-black" />
        </button>
      }
    </>
  )
}

