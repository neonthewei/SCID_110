"use client"
import { useEffect, useState } from "react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <>
      {isVisible && 
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-black dark:bg-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 z-[9999]"
          aria-label="回到頂部"
        >
          <ChevronUpIcon className="h-6 w-6 text-white dark:text-black" />
        </button>
      }
    </>
  )
}

